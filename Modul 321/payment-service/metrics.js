// metrics.js
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const paymentCreatedMessages = new client.Counter({
    name: 'payment_created_messages_total',
    help: 'Anzahl empfangener payment Nachrichten',
    labelNames: ['status'],
});
register.registerMetric(paymentCreatedMessages);

module.exports = {
    register,
    paymentCreatedMessages
};
