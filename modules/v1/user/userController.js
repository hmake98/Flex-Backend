const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const userService = require('./userService');
const logger = require('../../../helpers/logger');
const AWS = require('../../../helpers/aws');
const utils = require('../../../helpers/utils');
const {
    STANDARD,
    ERROR500,
    ERROR400,
} = require('../../../constants/comman');
const auth = require('../../../helpers/auth');

const userCtr = {};

userCtr.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (userName && password) {
            const user = await userService.getUserByUsername(userName);
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    const token = auth.generateToken(user._id);
                    return res.status(STANDARD.SUCCESS).json({
                        message: 'Loggedin Successfully.',
                        data: { ...user._doc, userId: user._id },
                        token: token
                    });
                }
                return res.status(ERROR400.CODE).json({
                    error: 'Invalid password!',
                });
            }
            return res.status(ERROR400.CODE).json({
                error: 'User not found!',
            });
        }
    } catch (err) {
        logger.error('Error from login.', err);
        return res.status(ERROR500.CODE).json({
            error: 'Try again later.',
        });
    }
}

userCtr.signUp = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
        } = req.body;
        let result = {};
        if (userName && password) {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 10));
            const encPassword = await bcrypt.hash(password, salt);
            const user = {
                userName,
                password: encPassword,
                email
            };
            const savedUser = await userService.createUser(user);
            const token = auth.generateToken(savedUser._id);
            return res.status(STANDARD.SUCCESS).json({
                message: 'Signup successfully.',
                data: savedUser,
                token: token,
            });
        } else {
            return res.status(ERROR400.CODE).json({
                error: 'Invalid Input!',
            });
        }
    } catch (err) {
        return res.status(ERROR500.CODE).json({
            message: 'Try again later!',
            error: err
        });
    }
};

userCtr.compelteProfile = async (req, res) => {

};

userCtr.updatePassword = async (req, res) => {

}

module.exports = userCtr;