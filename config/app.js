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

app.set('port', process.env.PORT);
app.use(morgan('combined'));
app.use(bodyParser.json({
  limit: '10gb'
}));
app.use(bodyParser.urlencoded({
  limit: '10gb',
  extended: true
}));
app.use(cors());
app.use(`${process.env.ENV_URL}`, require('../routes'));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ Title: `Welcome to ${process.env.NAME}` }); //this or res.status(err.status || 500).send('error')
});

module.exports = app;