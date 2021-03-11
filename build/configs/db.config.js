"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const mongoose_1 = require("mongoose");
const logger_service_1 = __importDefault(require("../services/logger.service"));
const keys_1 = require("./keys");
exports.initDatabase = () => {
    mongoose_1.set('debug', false);
    mongoose_1.connect(keys_1.db.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        logger_service_1.default.info('Database connected!');
    }).catch((error) => {
        logger_service_1.default.info('Database connection error :', error);
    });
};
//# sourceMappingURL=db.config.js.map