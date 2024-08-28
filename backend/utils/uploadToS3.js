const {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');

const { v4: uuid } = require('uuid');

const s3 = new S3Client();
const BUCKET = process.env.BUCKET;

const uploadToS3 = async ({ file }) => {
  const key = `product/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = uploadToS3;
