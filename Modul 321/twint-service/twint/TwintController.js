const dotenv = require('dotenv');
const amqp = require('amqplib');
const {v4: uuidv4} = require('uuid');

// Env Variablen konfigurieren
dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});
const rabbitmqUri = process.env.RABBITMQ_URI;


exports.pay = async (req, res) => {
    const transactionId = req.params.transactionId;
    const correlationId = req.correlationId;

    try {
        console.info(`Zahlungsanforderung erhalten: ${transactionId}`, { correlationId });

        // Twint-URL direkt zurückgeben
        const paymentUrl = `https://twint.ch/${transactionId}`;
        res.status(200).json({ url: paymentUrl });

        // Asynchrone Verarbeitung im Hintergrund
        setTimeout(async () => {
            await sendPaymentToQueue(transactionId, req);
        }, 10000); // 10 Sekunden Verzögerung

    } catch (error) {
        console.error("Fehler im Twint-Service: " + error, { correlationId });
        res.status(500).json({ message: "Internal Twint Error" });
    }
};

async function sendPaymentToQueue(transactionId, req) {
    const failed = Math.random() < 0.5; // 50/50 Chance für true oder false

    try {
        const connection = await amqp.connect(rabbitmqUri);
        const channel = await connection.createChannel();
        const queue = 'payment_processed';

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify({ transactionId, failed })),
            {
                persistent: true,
                headers: {
                    'correlation-id': req.correlationId
                }
            }
        );

        console.info(`Transaction wurde gesendet: ${transactionId}, failed: ${failed}`, {
            correlationId: req.correlationId
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Fehler beim Senden an RabbitMQ: " + error, {
            correlationId: req.correlationId
        });
    }
}

