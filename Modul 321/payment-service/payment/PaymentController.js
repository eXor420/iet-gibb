const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const logger = require('./../logger');
const axios = require("axios");
const {connect} = require("amqplib");
const { paymentCreatedMessages } = require('./../metrics');


dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});

const mongoUri = process.env.MONGO_URI;
const rabbitmqUri = process.env.RABBITMQ_URI;


exports.pay = async (req, res) => {
    const transactionId = req.params.transactionId;
    const correlationId = uuidv4();

    try {
        const client = await MongoClient.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db("mongo-db");
        const paymentCollection = db.collection("payment");

        const existing = await paymentCollection.findOne({ transactionId });

        if (existing) {
            await client.close();
            logger.warn("Transaktion existiert bereits: " + transactionId, { correlationId });
            return res.status(409).json({ message: "Transaction already exists" });
        }

        await paymentCollection.insertOne({
            transactionId,
            status: "PENDING",
            createdAt: new Date()
        });

        await client.close();

        logger.info("Neue Transaktion erstellt: " + transactionId, { correlationId });

        // Anfrage an Twint-Service mit Pfad und Header
        const twintResponse = await axios.post(
            `http://twint-service:3004/pay/${transactionId}`,
            {},
            {
                headers: {
                    'X-Correlation-ID': correlationId
                }
            }
        );

        const paymentUrl = twintResponse.data?.url;

        if (!paymentUrl) {
            logger.error("Twint-Service lieferte keine URL zurück", { correlationId });
            return res.status(502).json({ message: "Payment URL not returned by Twint service" });
        }

        res.status(201).json({
            message: "Payment created",
            transactionId,
            paymentUrl
        });
    } catch (error) {
        logger.error("Fehler beim Anlegen der Transaktion oder beim Twint-Service-Aufruf: " + error, { correlationId });
        res.status(500).json({ message: "Internal Server Error" });
    }
};

async function resetDatabase() {
    const correlationId = uuidv4();
    try {
        const client = await MongoClient.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db("mongo-db");

        await db.collection("payment").deleteMany({});
        await client.close();

        logger.info("Alle Payments wurden gelöscht", {correlationId});
    } catch (error) {
        logger.error("Fehler beim Zurücksetzen der Datenbank: " + error, {correlationId});
    }
}

async function processPaymentQueue() {
    try {
        const connection = await connect(rabbitmqUri);
        const channel = await connection.createChannel();
        const queue = 'payment_processed';

        await channel.assertQueue(queue, { durable: true });

        logger.info("Warte auf Nachrichten in der Queue: " + queue);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const paymentData = JSON.parse(msg.content.toString());
                const correlationId = msg.properties.headers?.['correlation-id'] || uuidv4();

                logger.info("Empfangene Nachricht: " + JSON.stringify(paymentData), { correlationId });

                try {
                    const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
                    const db = client.db("mongo-db");
                    const paymentCollection = db.collection("payment");

                    const newStatus = paymentData.failed ? "FAILED" : "SUCCESS";

                    const result = await paymentCollection.updateOne(
                        { transactionId: paymentData.transactionId },
                        { $set: { status: newStatus, updatedAt: new Date() } }
                    );

                    if (result.matchedCount === 0) {
                        logger.warn("Keine passende Transaktion gefunden: " + paymentData.transactionId, { correlationId });
                    } else {
                        logger.info(`Status gesetzt auf ${newStatus}: ` + paymentData.transactionId, { correlationId });
                        paymentCreatedMessages.inc({ status: newStatus.toLowerCase() });
                    }

                    await client.close();

                    channel.ack(msg);
                } catch (error) {
                    logger.error("Fehler bei der Verarbeitung: " + error, { correlationId });
                    paymentCreatedMessages.inc({ status: 'error' });
                }
            }
        });
    } catch (error) {
        logger.error("Fehler beim Verbinden mit RabbitMQ: " + error);
    }
}


// Datenbank-Reset beim Start der App aufrufen
resetDatabase();

// Starten der RabbitMQ-Queue Verarbeitung
processPaymentQueue();
