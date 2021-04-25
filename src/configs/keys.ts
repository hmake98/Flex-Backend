import { ENVIROMENT } from '../utils/messages'
import { config } from 'dotenv'
config()

declare let process: { env: { [key: string]: string } }

const DB: any = {}
const TOKEN: any = {}
const AWS: any = {}
const ENV = process.env.NODE_ENV.toUpperCase() || ENVIROMENT.DEVELOPMENT.toUpperCase()

// 1.DB CONFIG.
<<<<<<< HEAD
DB.TYPEORM_HOST = process.env[`${ENV}_TYPEORM_HOST`]
DB.TYPEORM_PORT = parseInt(process.env[`${ENV}_TYPEORM_PORT`])
DB.TYPEORM_USERNAME = process.env[`${ENV}_TYPEORM_USERNAME`]
DB.TYPEORM_PASSWORD = process.env[`${ENV}_TYPEORM_PASSWORD`]
DB.TYPEORM_DATABASE = process.env[`${ENV}_TYPEORM_DATABASE`]
=======
DB.DB_URL = process.env[`${ENV}_DB_URL`]
>>>>>>> 2e097cc154e45f1158acd6fff60bc04d20a14210

// 2.TOKEN CONFIG.
TOKEN.TYPE = process.env[`${ENV}_TOKEN_TYPE`]
TOKEN.ACCESS_EXP = process.env[`${ENV}_ACCESS_EXP`]
TOKEN.REFRESH_EXP = process.env[`${ENV}_REFRESH_EXP`]
TOKEN.ACCESS_TOKEN = process.env[`${ENV}_ACCESS_TOKEN_SECRET`]
TOKEN.REFRESH_TOKEN = process.env[`${ENV}_REFRESH_TOKEN_SECRET`]

// 3.AWS
AWS.AWS_FROM_EMAIL = process.env[`${ENV}_AWS_FROM_EMAIL`]
AWS.AWS_ACCESS_KEY = process.env[`${ENV}_AWS_ACCESS_KEY`]
AWS.AWS_SECRET_KEY = process.env[`${ENV}_AWS_SECRET_KEY`]
AWS.AWS_SES_REGION = process.env[`${ENV}_AWS_SES_REGION`]

<<<<<<< HEAD
export const db = DB;
export const token = TOKEN;
export const aws_keys = AWS;
export const PORT = process.env.PORT || 5000;
export const saltRound = Number(process.env.GEN_SALT_ROUND) || 10;
=======
export const db = DB
export const token = TOKEN
export const aws_keys = AWS
export const PORT = process.env.PORT || 7000
export const saltRound = Number(process.env.GEN_SALT_ROUND) || 10
>>>>>>> 2e097cc154e45f1158acd6fff60bc04d20a14210
