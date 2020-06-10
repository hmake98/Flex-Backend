const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('request');

const userModel = require('../models/User');

const logger = require('../helpers/logger');
const {
  ERROR401,
  ERROR400,
} = require('../constants/comman');

const auth = {};

auth.validateUser = (req, res, next) => {
  // Express headers are auto converted to lowercase
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        logger.error(err);
        return res.status(ERROR401.CODE).json({
          error: req.t('INVALID_TOKEN'),
        });
      }
      if (decoded) {
        return next();
      }
    });
  } else {
    return res.status(ERROR400.CODE).json({
      error: req.t('INVALID_TOKEN'),
    });
  }
};

auth.isAuthenticatedUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.status(ERROR401.CODE).json({
      error: req.t('PERMISSION_ERROR'),
    });
  }
  const userData = jwt.verify(token, process.env.PRIVATE_KEY);
  if (!userData.userId) {
    return res.status(ERROR401.CODE).json({
      error: req.t('PERMISSION_ERROR'),
    });
  }
  userModel.findOne({ _id: mongoose.Types.ObjectId(userData.userId) })
    .then((user) => {
      req.authUser = user;
      if (!_.isEmpty(user)) {
        next();
      } else {
        return res.status(ERROR401.CODE).json({
          error: req.t('ERR_USER_NOT_FOUND'),
        });
      }
    }).catch(() => {
      return res.status(ERROR401.CODE).json({
        error: req.t('PERMISSION_ERROR'),
      });
    });
};

auth.generateToken = (id) => {
  if (id) {
    return jwt.sign({ userId: id }, process.env.PRIVATE_KEY);
  }
  return false;
};

module.exports = auth;
