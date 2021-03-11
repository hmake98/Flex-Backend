"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCode = exports.getTime = exports.uploadToS3Bucket = exports.checkPassword = exports.generatePassword = exports.generate_tokens = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const keys_1 = require("../configs/keys");
const logger_service_1 = __importDefault(require("../services/logger.service"));
const fs_1 = require("fs");
const keys_2 = require("../configs/keys");
const aws_sdk_1 = require("aws-sdk");
const bcrypt_1 = require("bcrypt");
const path = __importStar(require("path"));
const keys_3 = require("./../configs/keys");
const s3 = new aws_sdk_1.S3({
    accessKeyId: keys_2.aws_keys.AWS_ACCESS_KEY,
    secretAccessKey: keys_2.aws_keys.AWS_SECRET_KEY,
    region: keys_2.aws_keys.AWS_SES_REGION,
});
exports.generate_tokens = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let accessToken = jsonwebtoken_1.sign(user, keys_1.token.ACCESS_TOKEN, { expiresIn: keys_1.token.ACCESS_EXP });
            let refreshToken = jsonwebtoken_1.sign(user, keys_1.token.REFRESH_TOKEN, { expiresIn: keys_1.token.REFRESH_EXP });
            resolve({
                accessToken,
                refreshToken,
                token_type: keys_1.token.TYPE,
                token_exp: Date.parse(Date()) + parseInt(keys_1.token.ACCESS_EXP) * 24 * 60 * 60 * 1000
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.generatePassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.genSalt(keys_3.saltRound, function (err, salt) {
            if (err)
                reject(err);
            bcrypt_1.hash(password, salt, function (err, hash) {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    });
};
exports.checkPassword = (encoded, input) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.compare(input, encoded, function (err, decoded) {
            if (err)
                reject(err);
            resolve(decoded);
        });
    });
};
exports.uploadToS3Bucket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { file, bucketPath } = data;
            const extension = path.extname(file.originalFilename);
            const newFilename = `${exports.getTime()}${extension}`;
            const newPath = bucketPath + newFilename;
            const myBucket = String(process.env.BUCKET_NAME);
            const params = {
                Bucket: myBucket,
                Key: newPath,
                Body: fs_1.createReadStream(file.path),
                ContentEncoding: 'base64',
                ACL: 'public-read',
                ContentType: file.type,
            };
            s3.putObject(params, (error, result) => {
                logger_service_1.default.info('Success Uploaded Image Result on S3', result);
                if (error) {
                    logger_service_1.default.error('Error Uploaded Image Result on S3', error);
                    return reject(error);
                }
                return resolve(newFilename);
            });
        }
        catch (error) {
            logger_service_1.default.error('Error While Uploading Image on S3', error);
            return reject(error);
        }
    }));
});
exports.getTime = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
};
exports.randomCode = () => {
    // this will return random 5 digit code.
    // which will be used as user confirmation
    return Math.floor(10000 + Math.random() * 90000);
};
//# sourceMappingURL=helper.js.map