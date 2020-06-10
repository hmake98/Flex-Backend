require("dotenv").config();
const http = require('http');
const app = require('./config/app');
const logger = require('./helpers/logger');

http.createServer(app).listen(app.get('port'), () => {
    logger.info(`Express server listening on port ${app.get('port')}`);
});