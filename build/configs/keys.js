"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltRound = exports.PORT = exports.aws_keys = exports.token = exports.db = void 0;
const messages_1 = require("../utils/messages");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const DB = {};
const TOKEN = {};
const AWS = {};
const ENV = process.env.NODE_ENV.toUpperCase() || messages_1.ENVIROMENT.DEVELOPMENT.toUpperCase();
// 1.DB CONFIG.
DB.DB_URL = process.env[`${ENV}_DB_URL`];
// 2.TOKEN CONFIG.
TOKEN.TYPE = process.env[`${ENV}_TOKEN_TYPE`];
TOKEN.ACCESS_EXP = process.env[`${ENV}_ACCESS_EXP`];
TOKEN.REFRESH_EXP = process.env[`${ENV}_REFRESH_EXP`];
TOKEN.ACCESS_TOKEN = process.env[`${ENV}_ACCESS_TOKEN_SECRET`];
TOKEN.REFRESH_TOKEN = process.env[`${ENV}_REFRESH_TOKEN_SECRET`];
// 3.AWS
AWS.AWS_FROM_EMAIL = process.env[`${ENV}_AWS_FROM_EMAIL`];
AWS.AWS_ACCESS_KEY = process.env[`${ENV}_AWS_ACCESS_KEY`];
AWS.AWS_SECRET_KEY = process.env[`${ENV}_AWS_SECRET_KEY`];
AWS.AWS_SES_REGION = process.env[`${ENV}_AWS_SES_REGION`];
exports.db = DB;
exports.token = TOKEN;
exports.aws_keys = AWS;
exports.PORT = process.env.PORT || 7000;
exports.saltRound = Number(process.env.GEN_SALT_ROUND) || 10;
//# sourceMappingURL=keys.js.map