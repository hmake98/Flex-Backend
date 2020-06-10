const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const config = require('../config/config');
const utils = require('./utils');
const logger = require('./logger');

const {
  accessKey, sharedSecret, region,
} = config.credentials;

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: sharedSecret,
  region: region,
  apiVersions: {
    s3: process.env.AWS_S3_API_VERSION,
  },
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();
const awsUtils = {};

awsUtils.uploadPublicImageToS3 = (file, storagePath) => {
  return new Promise((resolve, reject) => {
    try {
      const extension = path.extname(file.originalFilename);
      const newFilename = `${utils.getTime()}${extension}`;
      const newPath = storagePath + newFilename;
      const myBucket = process.env.BUCKET_NAME;
      fs.readFile(file.path, (err, data) => {
        if (err) {
          throw err;
        }
        const params = {
          Bucket: myBucket,
          Key: newPath,
          Body: data,
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
      });
    } catch (err) {
      logger.error('Error While Uploading Image on S3', err);
      return reject(err);
    }
  });
};

module.exports = awsUtils;
