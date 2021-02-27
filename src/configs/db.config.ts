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
        console.log(`🚀 ${db.DB_URL} Database connected!`)
    }).catch((error) => {
        console.log('Database connection error :', error)
    })
}