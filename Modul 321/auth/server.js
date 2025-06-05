const express = require('express');
const AuthController = require('./auth/AuthController');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const client = require('prom-client');

// Express Setup
const app = express();
const port = 3001;

// Prometheus Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom Counter-Metrik
const httpRequests = new client.Counter({
    name: 'http_requests_total',
    help: 'Anzahl HTTP Requests',
    labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequests);

// Middleware: JSON und CORS
app.use(express.json());
app.use(cors());

// Middleware: Correlation ID
app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
});

// Middleware: HTTP Request zählen
app.use((req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const route = req.route?.path || req.path || 'unknown';

        httpRequests.inc({
            method: req.method,
            route: route,
            status: res.statusCode,
        });
    });

    next();
});

// Metrics-Endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Auth-Router
const router = express.Router();
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/validate-token', AuthController.validateToken);
app.use('/', router);

// Serverstart
app.listen(port, () => {
    console.log(`xServer auth listening on port ${port}`);
});
