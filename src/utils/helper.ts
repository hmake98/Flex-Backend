import { sign } from 'jsonwebtoken';
import { token, } from '../configs/keys';
import logger from '../services/logger.service';
import { createReadStream } from 'fs';
import { IS3FileUpload } from './interfaces';
import { aws_keys } from '../configs/keys';
import { S3 } from 'aws-sdk';
import * as path from 'path'
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const s3 = new S3({
    accessKeyId: aws_keys.AWS_ACCESS_KEY,
    secretAccessKey: aws_keys.AWS_SECRET_KEY,
    region: aws_keys.AWS_SES_REGION,
});

export const generate_tokens = (user: object): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            let accessToken = sign(user, token.ACCESS_TOKEN, { expiresIn: token.ACCESS_EXP });
            let refreshToken = sign(user, token.REFRESH_TOKEN, { expiresIn: token.REFRESH_EXP });
            resolve({
                accessToken,
                refreshToken,
                token_type: token.TYPE,
                token_exp: Date.parse(Date()) + parseInt(token.ACCESS_EXP) * 24 * 60 * 60 * 1000
            });
        } catch (error) {
            reject(error)
        }
    })
}

export const uploadToS3Bucket = async (data: IS3FileUpload): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                file,
                bucketPath
            } = data
            const extension = path.extname(file.originalFilename);
            const newFilename = `${getTime()}${extension}`;
            const newPath = bucketPath + newFilename;
            const myBucket = String(process.env.BUCKET_NAME);
            const params: PutObjectRequest = {
                Bucket: myBucket,
                Key: newPath,
                Body: createReadStream(file.path),
                ContentEncoding: 'base64',
                ACL: 'public-read',
                ContentType: file.type,
            };
            s3.putObject(params, (error, result) => {
                logger.info('Success Uploaded Image Result on S3', result);
                if (error) {
                    logger.error('Error Uploaded Image Result on S3', error);
                    return reject(error);
                }
                return resolve(newFilename);
            });
        } catch (error) {
            logger.error('Error While Uploading Image on S3', error);
            return reject(error);
        }
    })
}

export const getTime = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
};


export const randomCode = () => {
    // this will return random 5 digit code.
    // which will be used as user confirmation
    return Math.floor(10000 + Math.random() * 90000)
}