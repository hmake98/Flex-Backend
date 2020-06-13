const express = require('express');
const multipart = require('connect-multiparty');

const userCtr = require('./userController');
const userMiddleware = require('./userMiddleware');
const { validationHandler } = require('../../../helpers/validate');
const auth = require('../../../helpers/auth');

const multipartMiddleware = multipart();
const userRouter = express.Router();

const login = [
  userMiddleware.loginUserValidator(),
  validationHandler,
  userCtr.login,
];
userRouter.post('/login', login);

// Complete Profile OR Update Profile API
const signUp = [
  userMiddleware.signUpUserValidator(),
  userMiddleware.isUserExists,
  validationHandler,
  userCtr.signUp,
];
userRouter.post('/signup', signUp);

const completeProfile = [
  userMiddleware.completeProfileValidator(),
  multipartMiddleware,
  auth.validateUser,
  auth.isAuthenticatedUser,
  validationHandler,
  userCtr.compelteProfile,
];
userRouter.post('/complete-profile', completeProfile);

const updatePassword = [
  userMiddleware.updatePasswordValidator(),
  auth.validateUser,
  auth.isAuthenticatedUser,
  validationHandler,
  userCtr.updatePassword,
];
userRouter.post('/update-password', updatePassword);

module.exports = userRouter;