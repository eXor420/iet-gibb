const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const TwintController = require('./twint/TwintController');

// Express Setup
const app = express();
const port = 3004;
app.use(express.json());
app.use(cors());

// Middleware für correlation-id

app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
});
const router = express.Router();


app.use('/', router);
module.exports = router;
router.post('/pay/:transactionId', TwintController.pay);


// Server starten
app.listen(port, () => {
    console.info(`xServer twint mock service listening on port ${port}`);
});
