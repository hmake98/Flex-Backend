const express = require('express');
const path = require('path');

const router = express.Router();
const apiVersion = path.basename(__filename, '.js');

router.use((req, res, next) => {
  req.apiVersion = apiVersion;
  return next();
});

// Routes
router.use('/user', require('./user/userRoute'));


module.exports = router;
