const { createMongoDBBackup, createMySQLBackup } = require("../helpers/backup-helpers");
const { getSettingValue } = require("../helpers/chche-helper");
const { createZipFile } = require("../helpers/createzipfile-hepler");
const { uploadFile } = require("../helpers/upload-helpers");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const backupService = {

  createBackup: async () => {
    // Create MongoDB backup
    const mongoDBBackupPath = await createMongoDBBackup();
    if (!mongoDBBackupPath) {
      throw new Error('Failed to create MongoDB backup');
    }

    // Create MySQL backup
    const mysqlDumpResult = await createMySQLBackup();
    if (!mysqlDumpResult) {
      throw new Error('Failed to create MySQL backup');
    }

    // Prepare MySQL backup data
    const mysqlBackupData = { data: mysqlDumpResult, name: 'mysql_backup.sql' };

    const zipFilePath = await createZipFile([
      { data: mongoDBBackupPath, name: 'mongodb_backup' },
      { data: mysqlBackupData.data, name: mysqlBackupData.name }
    ]);
    if (!zipFilePath) {
      throw new Error('Failed to create zip file');
    }

    // Determine the upload option based on UPLOAD_ENV
    const UPLOAD_ENV = await getSettingValue('UPLOAD_ENV');

    // Upload zip file
    const uploadedZipPath = await uploadFile(UPLOAD_ENV, zipFilePath);
    if (!uploadedZipPath) {
      throw new Error('Failed to upload zip file');
    }

    // Get relative path
    const relativePath = path.relative(__dirname, uploadedZipPath);

    return {
      backupUrl: relativePath
    };
  },

  deleteOldBackups: async () => {
    try {
      const backupFolder = path.join(__dirname, '..', 'backups');
      const files = fs.readdirSync(backupFolder);
      const sortedFiles = files.sort((a, b) => fs.statSync(path.join(backupFolder, a)).mtime.getTime() - fs.statSync(path.join(backupFolder, b)).mtime.getTime());
      const numberOfFilesToDelete = sortedFiles.length - process.env.MAX_BACKUPS;

      for (let i = 0; i < numberOfFilesToDelete; i++) {
        const fileToDelete = path.join(backupFolder, sortedFiles[i]);
        await fs.promises.unlink(fileToDelete);
        console.log('Deleted old backup:', fileToDelete);
      }
    } catch (error) {
      console.error('Error deleting old backups:', error);
    }
  },

}

module.exports = backupService;
