const express = require('express');
const multipart = require('connect-multiparty');

const userCtr = require('./userController');
const userMiddleware = require('./userMiddleware');
const { validationHandler } = require('../../../helpers/validate');
const auth = require('../../../helpers/auth');

const multipartMiddleware = multipart();
const userRouter = express.Router();

const login = [
  userMiddleware.LoginUserValidator(),
  validationHandler,
  userCtr.Login,
];
userRouter.post('/login', login);

const SignUp = [
  userMiddleware.SignUpUserValidator(),
  userMiddleware.isUserExists,
  validationHandler,
  userCtr.SignUp,
];
userRouter.post('/signup', SignUp);

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
  validationHandler,
  userCtr.updatePassword,
];
userRouter.post('/update-password', updatePassword);

module.exports = userRouter;