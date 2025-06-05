const bcrypt = require("bcrypt");
const {MongoClient} = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const amqp = require('amqplib');
const logger = require('./../logger');
const {v4: uuidv4} = require('uuid');
const { userCreatedMessages } = require('./../metrics');

// Env Variablen konfigurieren
dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});
const mongoUri = process.env.MONGO_URI;
const rabbitmqUri = process.env.RABBITMQ_URI;

async function resetDatabase() {
    const correlationId = uuidv4();
    try {
        const client = await MongoClient.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db("mongo-db");

        await db.collection("user").deleteMany({});
        await client.close();

        logger.info("Alle Nutzer wurden gelöscht", {correlationId});
    } catch (error) {
        logger.error("Fehler beim Zurücksetzen der Datenbank: " + error, {correlationId});
    }
}

async function processUserQueue() {
    try {
        const connection = await amqp.connect(rabbitmqUri);
        const channel = await connection.createChannel();
        const queue = 'user_created';

        await channel.assertQueue(queue, {durable: true});

        logger.info("Warte auf Nachrichten in der Queue: " + queue);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const userData = JSON.parse(msg.content.toString());
                const correlationId = msg.properties.headers?.['correlation-id'] || uuidv4();

                logger.info("Empfangene Nachricht: " + JSON.stringify(userData), {correlationId});

                try {
                    const client = await MongoClient.connect(mongoUri);
                    const db = client.db("mongo-db");

                    const existingUser = await db.collection('user').findOne({email: userData.email});

                    if (!existingUser) {
                        await db.collection('user').insertOne({
                            _id: userData.id,
                            email: userData.email,
                        });

                        logger.info("User erfolgreich gespeichert: " + userData.email, { correlationId });
                        userCreatedMessages.inc({ status: 'created' });
                    } else {
                        logger.warn("User existiert bereits: " + userData.email, { correlationId });
                        userCreatedMessages.inc({ status: 'duplicate' });
                    }


                    await client.close();
                    channel.ack(msg);
                } catch (error) {
                    logger.error("Fehler beim Speichern in DB: " + error, { correlationId });
                    userCreatedMessages.inc({ status: 'error' });
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
processUserQueue();
