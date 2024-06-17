const backupService = require('../services/backup');

const backupApi = {
  getBackup: async (req, res) => {
    try {
      const backupUrls = await backupService.createBackup();
      res.status(200).json({error:false,msg: 'Backups created successfully', backupUrls});
    } catch (error) {
      console.error('Error creating backups:', error);
      res.status(400).json({error:true, msg:error.message});
    }
  }
}

module.exports = backupApi;
