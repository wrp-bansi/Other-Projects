const fs = require('fs');
const path = require('path');
const s3 = require("../config/s3-config");
const {getSettingValue} = require('../helpers/chche-helper'); // Import the getSettingValue function

const allUploadModule = {
  uploadFile: async (uploadOption, backupFilePath) => {
    let finalPath;

    try {
      const awsBucketName = await getSettingValue('AWS_BUCKET_NAME'); // Use getSettingValue to fetch the setting value
      const uploadEnv = await getSettingValue('UPLOAD_ENV'); // Use getSettingValue to fetch the setting value

      if (uploadOption === uploadEnv) {
        const fileName = `${Date.now()}-backup.zip`;
        const localFilePath = path.join(__dirname, '..', 'backups', fileName);
        await fs.promises.rename(backupFilePath, localFilePath);
        finalPath = localFilePath;
      // eslint-disable-next-line no-dupe-else-if
      } else if (uploadOption === uploadEnv) {
        const fileName = `${Date.now()}-backup.zip`;
        const uploadParams = {
          Bucket: awsBucketName,
          Key: `backups/${fileName}`,
          Body: fs.createReadStream(backupFilePath)
        };
        const uploadedFile = await s3.upload(uploadParams).promise();
        finalPath = uploadedFile.Location;
      } else {
        throw new Error('Invalid upload option');
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Rethrow the error
    }

    return finalPath;
  }
};

module.exports = allUploadModule;
