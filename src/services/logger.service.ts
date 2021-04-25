<<<<<<< HEAD

import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
=======
import { createLogger, format, transports } from 'winston'
const env = process.env.NODE_ENV || 'development'

const logger = createLogger({
	level: env === 'development' ? 'debug' : 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [new transports.File({ filename: 'stdout.log' })],
})
>>>>>>> 2e097cc154e45f1158acd6fff60bc04d20a14210

export default logger
