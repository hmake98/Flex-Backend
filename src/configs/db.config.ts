import { connect, set } from 'mongoose'
import logger from '../services/logger.service';
import { db } from './keys';

export const initDatabase = () => {
    set('debug', false);
    connect(db.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        logger.info('Database connected!')
    }).catch((error) => {
        logger.info('Database connection error :', error)
    })
}