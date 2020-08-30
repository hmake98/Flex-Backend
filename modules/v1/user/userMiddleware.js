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

middleware.LoginUserValidator = () => {
    return [
        check('userName', 'userName is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};


middleware.SignUpUserValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('userName', 'Username is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.completeProfileValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('firstName', 'firstName is required').exists({ checkFalsy: true }),
        check('lastName', 'lastName is required').exists({ checkFalsy: true }),
        check('profilePic', 'profilePic is required').optional(),
        check('birthdate', 'birthdate is required').optional(),
        check('phone', 'phone is required').optional(),
    ];
};

middleware.updatePasswordValidator = () => {
    return [
        check('oldPassword', 'oldPassword is required').exists({ checkFalsy: true }),
        check('newPassword', 'newPassword is required').exists({ checkFalsy: true }),
    ];
};

// Check if is user exists or not if exists then return (Find By facebookId)
middleware.isUserExists = async (req, res, next) => {
    try {
        const {
            userName
        } = req.body;
        const user = await userService.getUserByUsername(userName);
        if (!user) {
            return next();
        }
        return res.status(STANDARD.SUCCESS).json({
            message: 'User already exist!'
        })
    } catch (err) {
        logger.error('Error From isUserExistsOrNot() in userMiddleware', err);
        return res.status(ERROR500.CODE).json({
            error: 'TRY_AGAIN',
        });
    }
};

module.exports = middleware;