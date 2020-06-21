const express = require('express');
const multipart = require('connect-multiparty');

const userCtr = require('./userController');
const userMiddleware = require('./userMiddleware');
const { validationHandler } = require('../../../helpers/validate');
const auth = require('../../../helpers/auth');

const multipartMiddleware = multipart();
const userRouter = express.Router();

const normalLogin = [
  userMiddleware.normalLoginUserValidator(),
  validationHandler,
  userCtr.normalLogin,
];
userRouter.post('/login', normalLogin);

const orgLogin = [
  userMiddleware.orgLoginUserValidator(),
  validationHandler,
  userCtr.orgLogin,
];
userRouter.post('/org-login', orgLogin);

const normalSignUp = [
  userMiddleware.normalSignUpUserValidator(),
  userMiddleware.isNormalUserExists,
  validationHandler,
  userCtr.normalSignUp,
];
userRouter.post('/signup', normalSignUp);

const orgSignUp = [
  userMiddleware.orgSignUpUserValidator(),
  userMiddleware.isOrgUserExists,
  validationHandler,
  userCtr.orgSignUp,
];
userRouter.post('/org-signup', orgSignUp);

const completeNormalProfile = [
  userMiddleware.completeNormalProfileValidator(),
  multipartMiddleware,
  auth.validateUser,
  auth.isAuthenticatedNormalUser,
  validationHandler,
  userCtr.compelteNormalProfile,
];
userRouter.post('/complete-profile', completeNormalProfile);

const completeOrgProfile = [
  userMiddleware.completeOrgProfileValidator(),
  multipartMiddleware,
  auth.validateUser,
  auth.isAuthenticatedOrgUser,
  validationHandler,
  userCtr.compelteOrgProfile,
];
userRouter.post('/complete-org-profile', completeOrgProfile);

const updatePassword = [
  userMiddleware.updatePasswordValidator(),
  auth.validateUser,
  validationHandler,
  userCtr.updatePassword,
];
userRouter.post('/update-password', updatePassword);

module.exports = userRouter;