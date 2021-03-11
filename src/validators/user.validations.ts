import { body } from 'express-validator';
import { VALIDATION } from '../utils/messages';

// alawys sanitizatize the input use trim and escape every for each input.
const createUser = [
    body('firstName').trim().escape().isAlpha().optional(),
    body('lastName').trim().escape().isAlpha().optional(),
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('userName').trim().escape().isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }).withMessage(VALIDATION.PASSWORD_LENGTH),
]

const updateUser = [
    body('firstName').trim().escape().isAlpha().optional(),
    body('lastName').trim().escape().isAlpha().optional(),
    body('userName').trim().escape().isAlphanumeric(),
    body('profilePic').trim().escape().isAlphanumeric(),
    body('email').trim().escape().isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }).withMessage(VALIDATION.PASSWORD_LENGTH),
]

const checkUserName = [
    body('userName').trim().escape().isAlpha(),
]

const social = [
    body('provider').trim().isIn(["GOOGLE", "FACEBOOK", "APPLE"]),
    body('socialId').trim().exists(),
    body('userName').trim().escape().isAlphanumeric(),
]

const normalLogin = [
    body('userName').trim().escape().isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 8 }).withMessage(VALIDATION.PASSWORD_LENGTH),
]

const codeVerification = [
    body('verification_code').trim().escape().isNumeric().isLength({ min: 5, max: 5 }).toInt(),
    body('two_step_auth').isBoolean().optional()
]


const forgotPassword = [
    body('email').trim().escape().isEmail().normalizeEmail(),
]


const resetPass = [
    body('passwordConfirmation').trim().isLength({ min: 8 }).withMessage(VALIDATION.PASSWORD_LENGTH),
    body('password').trim().isLength({ min: 8 }).withMessage(VALIDATION.PASSWORD_LENGTH).custom((val, { req, }) => {
        if (val !== req.body.passwordConfirmation) throw new Error(VALIDATION.CONFIRM_MISSMATCH);
        return true
    }),
]

export default {
    normalLogin,
    resetPass,
    createUser,
    updateUser,
    social,
    checkUserName,
    forgotPassword,
    codeVerification,
}