const {
    check,
} = require('express-validator');
const jwt = require('jsonwebtoken');

const userService = require('./userService');
const logger = require('../../../helpers/logger');
const {
    STANDARD,
    ERROR500,
} = require('../../../constants/comman');

const middleware = {};

middleware.loginUserValidator = () => {
    return [
        check('userName', 'userName is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.signUpUserValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('userName', 'Username is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.completeProfileValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('userName', 'Username is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

// Check if is user exists or not if exists then return (Find By facebookId)
middleware.isUserExistsOrNot = async (req, res, next) => {
    try {
       
    } catch (err) {
        logger.error('Error From isUserExistsOrNot() in userMiddleware', err);
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
        });
    }
};

module.exports = middleware;