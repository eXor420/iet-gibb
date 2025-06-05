// metrics.js
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const userCreatedMessages = new client.Counter({
    name: 'user_created_messages_total',
    help: 'Anzahl empfangener user_created Nachrichten',
    labelNames: ['status'],
});
register.registerMetric(userCreatedMessages);

module.exports = {
    register,
    userCreatedMessages
};
