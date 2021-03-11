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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const logger_service_1 = __importDefault(require("../services/logger.service"));
const Response_1 = require("../utils/Response");
const messages_1 = require("./../utils/messages");
const helper_1 = require("./../utils/helper");
class UserController extends Response_1.Responses {
    constructor() {
        super(...arguments);
        this.normallogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, password } = req.body;
                const exist_user = yield User_1.User.findOne({ userName });
                if (!exist_user) {
                    return this.failed(res, {}, messages_1.USER.NOT_FOUND, 400);
                }
                const check_password = yield helper_1.checkPassword(exist_user.password, password);
                if (!check_password) {
                    return this.failed(res, {}, messages_1.USER.PASSWORD_INCORRECT, 401);
                }
                const token = helper_1.generate_tokens(exist_user);
                this.success(res, { user: exist_user, auth: token });
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[normallogin]', error);
            }
        });
        this.normalsignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, firstName, lastName, userName, dateOfBirth, } = req.body;
                const exist_user = yield User_1.User.findOne({ userName });
                if (exist_user) {
                    return this.failed(res, {}, messages_1.USER.ALREADY_REGISTERED, 400);
                }
                const hashPass = yield helper_1.generatePassword(password);
                const createUser = new User_1.User({
                    email,
                    password: hashPass,
                    firstName,
                    lastName,
                    userName,
                    dateOfBirth,
                });
                const createdUser = yield createUser.save();
                const token = helper_1.generate_tokens(createdUser);
                // @ts-ignore
                delete createdUser.password;
                this.success(res, { user: createdUser, auth: token });
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[normalsignup]', error);
            }
        });
        this.socialSignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, provider, socialId, userName } = req.body;
                const exist_user = yield User_1.User.findOne({ socialId });
                if (exist_user) {
                    const token = helper_1.generate_tokens(exist_user);
                    // @ts-ignore
                    delete createdUser.password;
                    this.success(res, { user: exist_user, auth: token });
                }
                const createUser = new User_1.User({
                    firstName,
                    lastName,
                    provider,
                    socialId,
                    userName
                });
                const createdUser = yield createUser.save();
                const token = helper_1.generate_tokens(createdUser);
                // @ts-ignore
                delete createdUser.password;
                this.success(res, { user: createdUser, auth: token });
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[socialSignup]', error);
            }
        });
        this.checkUserName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName } = req.body;
                const check = yield User_1.User.findOne({ userName });
                if (check) {
                    return this.failed(res, {}, messages_1.USER.FOUND, 400);
                }
                this.success(res, {});
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[checkUserName]', error);
            }
        });
        this.socialSignin = (req, res, next) => {
            try {
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[socialSignin]', error);
            }
        };
        this.forgotPassword = (req, res, next) => {
            try {
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[forgotPassword]', error);
            }
        };
        this.updateUser = (req, res, next) => {
            try {
            }
            catch (error) {
                console.log(error);
                logger_service_1.default.error('[updateUser]', error);
            }
        };
    }
}
exports.UserController = UserController;
// return this.failed(res, {}, USER.ALREADY_REGISTERED, 200)
// this.success(res, { user: updatedUser, auth: tokens });
//# sourceMappingURL=user.controller.js.map