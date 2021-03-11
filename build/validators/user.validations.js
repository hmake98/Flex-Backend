"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const messages_1 = require("../utils/messages");
// alawys sanitizatize the input use trim and escape every for each input.
const createUser = [
    express_validator_1.body('firstName').trim().escape().isAlpha(),
    express_validator_1.body('lastName').trim().escape().isAlpha().optional(),
    express_validator_1.body('email').trim().escape().isEmail().normalizeEmail(),
    express_validator_1.body('userName').trim().escape().isAlphanumeric(),
    express_validator_1.body('password').trim().isLength({ min: 8 }).withMessage(messages_1.VALIDATION.PASSWORD_LENGTH),
];
const updateUser = [
    express_validator_1.body('firstName').trim().escape().isAlpha().optional(),
    express_validator_1.body('lastName').trim().escape().isAlpha().optional(),
    express_validator_1.body('userName').trim().escape().isAlphanumeric()
];
const social = [
    express_validator_1.body('firstName').trim().escape().isAlpha().optional(),
    express_validator_1.body('lastName').trim().escape().isAlpha().optional(),
    express_validator_1.body('provider').trim().isIn(["GOOGLE", "FACEBOOK", "APPLE"]),
    express_validator_1.body('socialId').trim().exists(),
    express_validator_1.body('userName').trim().escape().isAlphanumeric(),
];
const normalLogin = [
    express_validator_1.body('userName').trim().escape().isEmail().normalizeEmail(),
    express_validator_1.body('password').trim().isLength({ min: 8 }).withMessage(messages_1.VALIDATION.PASSWORD_LENGTH),
];
const codeVerification = [
    express_validator_1.body('verification_code').trim().escape().isNumeric().isLength({ min: 5, max: 5 }).toInt(),
    express_validator_1.body('two_step_auth').isBoolean().optional()
];
const forgotPassword = [
    express_validator_1.body('email').trim().escape().isEmail().normalizeEmail(),
];
const resetPass = [
    express_validator_1.body('passwordConfirmation').trim().isLength({ min: 8 }).withMessage(messages_1.VALIDATION.PASSWORD_LENGTH),
    express_validator_1.body('password').trim().isLength({ min: 8 }).withMessage(messages_1.VALIDATION.PASSWORD_LENGTH).custom((val, { req, }) => {
        if (val !== req.body.passwordConfirmation)
            throw new Error(messages_1.VALIDATION.CONFIRM_MISSMATCH);
        return true;
    }),
];
exports.default = {
    normalLogin,
    resetPass,
    createUser,
    updateUser,
    social,
    forgotPassword,
    codeVerification,
};
//# sourceMappingURL=user.validations.js.map