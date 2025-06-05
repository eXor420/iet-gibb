const express = require('express');
const cors = require('cors');
const client = require('prom-client');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');
const PaymentController = require('./payment/PaymentController');
const { paymentCreatedMessages } = require('./metrics');

// Metrics Setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });


register.registerMetric(paymentCreatedMessages);

// Express Setup
const app = express();
const port = 3003;
app.use(express.json());
app.use(cors());

// Middleware für correlation-id
app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
});


app.post('/:transactionId', PaymentController.pay);

// /metrics Endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

const router = express.Router();
app.use('/', router);
module.exports = router;


// Server starten
app.listen(port, () => {
    logger.info(`xServer payment service listening on port ${port}`);
});
