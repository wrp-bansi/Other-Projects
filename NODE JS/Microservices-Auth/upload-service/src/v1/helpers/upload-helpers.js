const fs = require('fs');
const path = require('path');
const s3 = require("../config/s3-config");
const sharp = require('sharp');
const { getSettingValue } = require('./chche-helper');
require('dotenv').config();

const allUploadModule = {
  uploadFile: async (file, uploadOption) => {
    try {
      // Fetch the uploadEnv value asynchronously from the database
      const uploadEnv = await getSettingValue('UPLOAD_ENV');
      const awsBucketName = await getSettingValue('AWS_BUCKET_NAME');
      let finalPath;

      if (uploadOption === uploadEnv) {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        const localFilePath = path.join('uploads', 'temp', fileName);
        const absoluteLocalFilePath = path.join(__dirname, '..', 'uploads', 'temp', fileName);
        await fs.promises.rename(file.path, absoluteLocalFilePath);
        finalPath = localFilePath;
      } else if (uploadEnv === 's3') {
        const compressedBuffer = await sharp(file.path).resize(800, 600).toBuffer();
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        const uploadParams = {
          Bucket: awsBucketName,
          Key: `images/${fileName}`,
          Body: compressedBuffer
        };
        const uploadedFile = await s3.upload(uploadParams).promise();
        finalPath = uploadedFile.Location;
      } else {
        throw new Error('Invalid upload option');
      }

      return finalPath;
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }
};

module.exports = allUploadModule;
