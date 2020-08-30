var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var cookieParser = require('cookie-parser');

// HTTP logger
var morgan = require('morgan');

// Body parser
const bodyParser = require('body-parser');

global._ = require('lodash');
global.config = require('../config/config');
global.models = require('../models');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(`${process.env.ENV_URL}`, require('../routes'));
app.set('port', port);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ Title: `Welcome to ${process.env.NAME}` }); 
});

module.exports = app;