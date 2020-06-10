const express = require('express');
const multipart = require('connect-multiparty');

const userCtr = require('./userController');
const userMiddleware = require('./userMiddleware');
const { validationHandler } = require('../../../helpers/validate');
const auth = require('../../../helpers/auth');

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
  validationHandler,
  userCtr.signUp,
];
userRouter.post('/signup', signUp);

module.exports = userRouter;