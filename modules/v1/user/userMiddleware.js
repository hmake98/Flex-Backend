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

middleware.normalLoginUserValidator = () => {
    return [
        check('userName', 'userName is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.orgLoginUserValidator = () => {
    return [
        check('email', 'userName is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};


middleware.normalSignUpUserValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('userName', 'Username is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.orgSignUpUserValidator = () => {
    return [
        check('email', 'Email is required').exists({ checkFalsy: true }),
        check('password', 'password is required').exists({ checkFalsy: true }),
    ];
};

middleware.completeNormalProfileValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('firstName', 'firstName is required').exists({ checkFalsy: true }),
        check('lastName', 'lastName is required').exists({ checkFalsy: true }),
        check('profilePic', 'profilePic is required').optional(),
        check('birthdate', 'birthdate is required').optional(),
        check('phone', 'phone is required').optional(),
    ];
};

middleware.completeOrgProfileValidator = () => {
    return [
        check('email', 'Email is required').isEmail().optional(),
        check('org_name', 'org_name is required').exists({ checkFalsy: true }),
        check('org_phone', 'org_phone is required').exists({ checkFalsy: true }),
        check('profilePic', 'profilePic is required').exists({ checkFalsy: true }),
        check('org_address', 'org_address is required').exists({ checkFalsy: true }),
        check('org_location', 'org_location is required').exists({ checkFalsy: true }),
    ];
};

middleware.updatePasswordValidator = () => {
    return [
        check('oldPassword', 'oldPassword is required').exists({ checkFalsy: true }),
        check('newPassword', 'newPassword is required').exists({ checkFalsy: true }),
        check('isTraveller', 'isTraveller is required').exists({ checkFalsy: true }),
    ];
};

// Check if is user exists or not if exists then return (Find By facebookId)
middleware.isNormalUserExists = async (req, res, next) => {
    try {
        const {
            userName
        } = req.body;
        const user = await userService.getNormalUserByUsername(userName);
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

middleware.isOrgUserExists = async (req, res, next) => {
    try {
        const {
            email
        } = req.body;
        const user = await userService.getOrgUserByEmail(email);
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