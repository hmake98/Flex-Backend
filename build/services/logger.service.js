"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const env = process.env.NODE_ENV || 'development';
const logger = winston_1.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [new winston_1.transports.File({ filename: 'stdout.log' })]
});
exports.default = logger;
//# sourceMappingURL=logger.service.js.map