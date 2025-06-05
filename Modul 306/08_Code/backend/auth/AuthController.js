const bcrypt = require("bcrypt");
const {MongoClient} = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
// Env Variablen konfigurieren
dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});
const mongoUri = process.env.MONGO_URI;

// JWT Secret für jwt tokens
const JWT_SECRET = 'DiesIstNichtSicher123sdlf&k$gjsdighjdmn';

// Methode um einen account zu erstellen
exports.signup = (async (req, res) => {
    // body auslesen
    const {email, password} = req.body;
    // validierung der eingaben
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({error: 'Invalid email format'});
    }
    if (password.length < 6){
        return res.status(400).json({error: 'Invalid password format'});
    }
    try {
        // Validieren ob user bereits existiert
        const client = await MongoClient.connect(mongoUri);
        const db = client.db('mongo-db');
        const existingUser = await db.collection('user').findOne({email: email});
        if (existingUser) {
            await client.close();
            return res.status(409).json({error: 'Email already in use'});
        }
        // passwort mit einem salt von 10 hashen und in db speichern
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            hashedPassword
        };
        await db.collection('user').insertOne(newUser);
        await client.close();

        // jwt token signen und an frontend schicken
        const token = jwt.sign({email: email}, JWT_SECRET, {expiresIn: '2h'});
        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({error: 'Failed to create user'});
    }
})

// methode um sich einzuloggen
exports.signin = async (req, res) => {
    // body auslesen
    const { email, password } = req.body;
    // body validieren
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // user in db suchen
        const client = await MongoClient.connect(mongoUri);
        const db = client.db('mongo-db');
        const user = await db.collection('user').findOne({ email: email });

        if (!user) {
            await client.close();
            return res.status(401).json({ error: 'Invalid password or username' });
        }
        // checken ob passwort übereinstimmt
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            await client.close();
            return res.status(401).json({ error: 'Invalid password or username' });
        }

        // jwt token signen und an frontend schicken
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        await client.close();
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
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
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// middleware exportieren
exports.authenticateToken = authenticateToken;