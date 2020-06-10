const devSetting = () => { };

// AWS
devSetting.credentials = {
  accessHost: process.env.ACCESS_HOST,
  accessKey: process.env.AWSAccessKeyId,
  sharedSecret: process.env.AWSSecretKey,
  region: process.env.REGION,
};

devSetting.AWS_CONFIG_S3 = {
  Bucket: process.env.BUCKET_NAME,
};

devSetting.AWS_FROM = process.env.AWS_FROM;
devSetting.AWS_BUCKET = process.env.BUCKET_NAME;

devSetting.SECRET = process.env.SECRET;

module.exports = devSetting;