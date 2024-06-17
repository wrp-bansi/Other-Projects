const express = require('express');
const backupController = require('../controllers/backup');
const router = express.Router();
const { BACKUP } = require('../config/assign-permission');
const { isValidPermissions } = require("../middleware/admin-auth");

// Backup API
router.post('/get',isValidPermissions(BACKUP.GET), backupController.getBackup);


module.exports = router;
