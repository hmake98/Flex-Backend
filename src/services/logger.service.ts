import { createLogger, format, transports } from 'winston';
const env = process.env.NODE_ENV || 'development';

const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.File({ filename: 'stdout.log' })]
});

export default logger;