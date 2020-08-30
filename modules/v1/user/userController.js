const bcrypt = require('bcrypt');

const userService = require('./userService');
const logger = require('../../../helpers/logger');
const AWS = require('../../../helpers/aws');
const {
    STANDARD,
    ERROR500,
    ERROR400,
} = require('../../../constants/comman');
const auth = require('../../../helpers/auth');

const userCtr = {};

userCtr.Login = async (req, res) => {
    try {
        const {
            userName,
            password,
        } = req.body;
        if (userName && password) {
            const user = await userService.getUserByUsername(userName);
            if (!user) {
                return res.status(ERROR400.CODE).json({
                    error: 'User not found!',
                });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(ERROR400.CODE).json({
                    error: 'Invalid password!',
                });
            }
            let userId = user._id;
            let data = { ...user._doc, userId: userId };
            delete data._id;
            delete data.password;
            const token = auth.generateToken(userId);
            return res.status(STANDARD.SUCCESS).json({
                message: 'Loggedin Successfully.',
                data,
                token: token
            });
        }
    } catch (err) {
        logger.error('[api] : Login => ', err);
        return res.status(ERROR500.CODE).json({
            error: 'Try again later.',
        });
    }
}

userCtr.SignUp = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
        } = req.body;
        if (userName && password) {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 10));
            const encPassword = await bcrypt.hash(password, salt);
            const user = {
                userName,
                password: encPassword,
                email,
            };
            const savedUser = await userService.createUser(user);
            const token = auth.generateToken(savedUser._id);
            let userId = savedUser._id;
            let data = { ...savedUser._doc, userId: userId };
            delete data._id;
            delete data.password;
            return res.status(STANDARD.SUCCESS).json({
                message: 'Signup successfully.',
                data,
                token: token,
            });
        }
        return res.status(ERROR400.CODE).json({
            error: 'Invalid Input!',
        });
    } catch (err) {
        logger.error('[api] : SignUp => ', err);
        return res.status(ERROR500.CODE).json({
            message: 'Try again later!',
            error: err
        });
    }
};

userCtr.compelteProfile = async (req, res) => {
    try {
        const userId = req.authUser.id;
        let uploadImg = '';
        const { profilePic } = req.files;
        const {
            email,
            firstName,
            lastName,
            birthdate,
            phone,
        } = req.body;
        const user = await userService.getUserByUserId(userId);
        if (user && profilePic) {
            const s3Result = await AWS.uploadPublicImageToS3(profilePic, 'users-profile-pics/');
            uploadImg = `${process.env.AWS_DEFAULT_USER_PROFILE_S3_PATH}${s3Result}`;
        }
        let updatedData = {
            email,
            firstName,
            lastName,
            profilePic: uploadImg,
            birthdate,
            phone,
        };
        const updatedUser = await userService.updateUser(userId, updatedData);
        let data = { ...updatedUser._doc };
        delete data.password;
        if (updatedUser) {
            return res.status(STANDARD.SUCCESS).json({
                message: 'updated successfully.',
                data,
            });
        }
    } catch (err) {
        logger.error('[api] : compelteProfile => ', err);
        return res.status(ERROR500.CODE).json({
            message: 'Try again later!',
            error: err
        });
    }
};

userCtr.updatePassword = async (req, res) => {
    try {
        const userId = req.authUser.id;
        const {
            oldPassword,
            newPassword,
        } = req.body;
        let user;
        user = await userService.getUserByUserId(userId);
        if (!user) {
            return res.status(ERROR500.CODE).json({
                message: 'No user found!',
            });
        }
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(ERROR500.CODE).json({
                message: 'Password is Invalid',
            });
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 10));
        const encPassword = await bcrypt.hash(newPassword, salt);
        const updateData = {
            password: encPassword
        };
        const updatedUser = await userService.updateUser(userId, updateData);
        if (updatedUser) {
            return res.status(STANDARD.SUCCESS).json({
                message: 'New Password updated successfully.'
            });
        }
    } catch (err) {
        logger.error('[api] : updatePassword => ', err);
        return res.status(ERROR500.CODE).json({
            message: 'Try again later!',
            error: err
        });
    }
}

module.exports = userCtr;