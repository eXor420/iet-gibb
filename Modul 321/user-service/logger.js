const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, correlationId }) => {
            return `[${timestamp}] [${level}] [user-service]${correlationId ? ` [correlation-id=${correlationId}]` : ''} ${message}`;
        })
    ),
    transports: [
        new transports.File({ filename: path.join('/app/logs', 'user.log') }),
        new transports.Console()
    ]
});

module.exports = logger;
