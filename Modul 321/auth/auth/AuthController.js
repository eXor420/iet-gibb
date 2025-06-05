const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const amqp = require('amqplib');
const logger = require('./../logger');
const { v4: uuidv4 } = require('uuid');

// Env Variablen konfigurieren
dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});
const mongoUri = process.env.MONGO_URI;
const rabbitmqUri = process.env.RABBITMQ_URI;

// JWT Secret für jwt tokens
const JWT_SECRET = 'DiesIstNichtSicher123sdlf&k$gjsdighjdmn';

async function sendUserToQueue(user, req) {
    try {
        const connection = await amqp.connect(rabbitmqUri);
        const channel = await connection.createChannel();
        const queue = 'user_created';

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(user)),
            {
                persistent: true,
                headers: {
                    'correlation-id': req.correlationId
                }
            }
        );

        logger.info('Neuer User wurde an RabbitMQ gesendet: ' + user.email, { correlationId: req.correlationId });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        logger.error("Fehler beim Senden an RabbitMQ: " + error, { correlationId: req.correlationId });
    }
}

// Methode um einen account zu erstellen
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Invalid password format' });
    }

    try {
        const client = await MongoClient.connect(mongoUri);
        const db = client.db('mongo-db');
        const existingUser = await db.collection('user').findOne({ email: email });

        if (existingUser) {
            await client.close();
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, hashedPassword };

        const result = await db.collection('user').insertOne(newUser);
        const userId = result.insertedId; // MongoDB generiert automatisch eine _id

        await client.close();

        logger.info("User stored in DB", { correlationId: req.correlationId });

        // User an RabbitMQ senden (mit ID)
        await sendUserToQueue({ id: userId.toString(), email }, req);

        const token = jwt.sign({ id: userId.toString(), email }, JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
        logger.error("Failed to create user", { correlationId: req.correlationId });
    }

};

// methode um sich einzuloggen
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const client = await MongoClient.connect(mongoUri);
        const db = client.db('mongo-db');
        const user = await db.collection('user').findOne({ email: email });

        if (!user) {
            await client.close();
            return res.status(401).json({ error: 'Invalid password or username' });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            await client.close();
            return res.status(401).json({ error: 'Invalid password or username' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        await client.close();
        res.json({ token });
        logger.info("User logged in: " + user.email, { correlationId: req.correlationId });
    } catch (error) {
        logger.error("Failed to log in", { correlationId: req.correlationId });
        res.status(500).json({ error: 'Failed to log in' });
    }
};

// Methode um zu validieren ob das token gültig ist
exports.validateToken = [
    authenticateToken,
    (req, res) => {
        res.json({ message: 'Token is valid', user: req.user });
    }
];

// middleware um token zu validieren und den user auszulesen
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

exports.authenticateToken = authenticateToken;

async function resetDatabase(req) {
    try {
        const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db("mongo-db");

        await db.collection("user").deleteMany({});

        const hashedPassword = await bcrypt.hash("123456", 10);
        const testUser = {
            email: "mda@ims.ch",
            hashedPassword
        };

        const result = await db.collection('user').insertOne(testUser);
        const userId = result.insertedId;

        await client.close();

        // User an RabbitMQ senden (mit ID)
        await sendUserToQueue({ id: userId.toString(), email: testUser.email }, req);

        logger.info("Alle Nutzer wurden gelöscht und der Testnutzer wurde erstellt.", { correlationId: req.correlationId });
    } catch (error) {
        logger.error("Fehler beim Zurücksetzen der Datenbank: " + error, { correlationId: req.correlationId });
    }
}

// Datenbank-Reset beim Start der App aufrufen
resetDatabase({ correlationId: uuidv4() });

