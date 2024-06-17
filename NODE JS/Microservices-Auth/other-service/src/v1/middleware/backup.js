const cron = require('node-cron');
const backupService = require('../services/backup');


// Cron job for creating backups daily
const backupCronJob = cron.schedule('0 0 * * *', async () => {
  try {
    const backupUrls = await backupService.createBackup();
    console.log('Backup created successfully:', backupUrls);
  } catch (error) {
    console.error('Error creating backup:', error);
  }
});

const backupCleanupCronJob = cron.schedule('0 0 * * *', async () => {
  try {
    await backupService.deleteOldBackups();
    console.log('Old backups deleted successfully.');
  } catch (error) {
    console.error('Error deleting old backups:', error);
  }
});

module.exports = { backupCronJob, backupCleanupCronJob };

