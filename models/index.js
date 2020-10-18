const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

mongoose.set('debug', false);
mongoose.Promise = require('bluebird');

let uri = 'mongodb://';

if (process.env.DBUSER && process.env.DBPASSWORD) {
    uri += `${process.env.DBUSER}:${process.env.DBPASSWORD}`;
}

uri += `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`;

logger.info(uri);

const db = {
    Schema: mongoose.Schema,
    Types: mongoose.Types,
};

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info(`${process.env.DATABASE} Database server connected`);
}).catch((error) => {
    logger.error(error);
    logger.error('Could not connect Monogo Database server');
});

prisma.$connect().then(() => {
    logger.info('Prisma connected');
}).catch(err => {
    logger.error(err);
})

module.exports = { db, prisma };