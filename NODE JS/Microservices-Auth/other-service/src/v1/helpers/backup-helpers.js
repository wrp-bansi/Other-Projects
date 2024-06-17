const mongodbBackup = require('mongodb-backup');
const mysqldump = require('mysqldump');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const createMongoDBBackup = async () => {
  const backupPath = path.join(__dirname, '..', 'backups', 'mongodb');
  await mongodbBackup({
    uri: process.env.MONGODB_CONNECTION_STRING,
    root: backupPath,
  });
  return backupPath;
}

const createMySQLBackup = async () => {
  const backupFolderPath = path.join(__dirname, '..', 'backups');
  const backupFilePath = path.join(backupFolderPath, 'mysql_backup.sql');

  await mysqldump({
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    },
    dumpToFile: backupFilePath // Specify the file path to dump the data directly to a file
  });

  // Check if the backup file exists
  const exists = fs.existsSync(backupFilePath);
  if (!exists) {
    throw new Error('Failed to create MySQL backup file');
  }

  return backupFilePath;

}


module.exports = { createMongoDBBackup, createMySQLBackup };
