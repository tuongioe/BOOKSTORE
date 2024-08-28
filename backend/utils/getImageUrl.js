const {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');

const { v4: uuid } = require('uuid');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client();
const BUCKET = process.env.BUCKET;

const getImageUrl = async ({ key }) => {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });

  return getSignedUrl(s3, command, { expiresIn: 900 }); // default
};

module.exports = getImageUrl;
