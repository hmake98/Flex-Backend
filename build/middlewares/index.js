"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const keys_1 = require("../configs/keys");
const messages_1 = require("../utils/messages");
const User_1 = require("../models/User");
class Middleware {
    constructor() {
        this.valid = (req, res, next) => {
            try {
                const errors = express_validator_1.validationResult(req);
                if (errors.isEmpty())
                    return next();
                const error = new Error(messages_1.VALIDATION.VALIDATION_ERROR);
                error.statusCode = 200;
                error.data = errors.array();
                next(error);
            }
            catch (error) {
                next(error);
            }
        };
        this.Auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let authorization = req.headers['authorization'];
                if (!authorization)
                    throw new Error(messages_1.ERRORS.MISSING_HEADER);
                let accessToken = authorization.split(' ')[1];
                if (!accessToken)
                    throw new Error(messages_1.ERRORS.UNAUTH_ACCESS);
                let decode = jsonwebtoken_1.verify(accessToken, keys_1.token.ACCESS_TOKEN);
                const foundUser = 'query';
                yield User_1.User.findOne({ where: { id: decode.id } });
                if (!foundUser) {
                    const error = new Error(messages_1.USER.NOT_FOUND);
                    error.statusCode = 401;
                    return next(error);
                }
                // @ts-ignore
                req['user'] = foundUser;
                next();
            }
            catch (error) {
                error.statusCode = 401;
                next(error);
            }
        });
        this.RefreshAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let authorization = req.headers['authorization'];
                if (!authorization)
                    throw new Error(messages_1.ERRORS.MISSING_HEADER);
                let accessToken = authorization.split(' ')[1];
                if (!accessToken)
                    throw new Error(messages_1.ERRORS.UNAUTH_ACCESS);
                let decode = jsonwebtoken_1.verify(accessToken, keys_1.token.REFRESH_TOKEN);
                const foundUser = 'query';
                yield User_1.User.findOne({ where: { id: decode.id } });
                if (!foundUser) {
                    const error = new Error(messages_1.USER.NOT_FOUND);
                    error.statusCode = 401;
                    return next(error);
                }
                // @ts-ignore
                req['user'] = foundUser;
                next();
            }
            catch (error) {
                error.statusCode = 401;
                next(error);
            }
        });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=index.js.map