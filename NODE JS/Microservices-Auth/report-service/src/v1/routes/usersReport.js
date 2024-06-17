const express = require("express");
const usersReportController = require("../controllers/usersReport");
const {isValidPermissions} = require("../middleware/admin-auth");
const {USER_REPOART} = require('../config/assign-permission');


const router = express.Router();
// Define routes
router.get('/admin/date',isValidPermissions(USER_REPOART.GET),usersReportController.getUsersByRegisterDate)
router.get('/admin/status',isValidPermissions(USER_REPOART.GET), usersReportController.getUsersByStatus)
router.get('/admin/registervsactive',isValidPermissions(USER_REPOART.GET), usersReportController.getRegisterVsActiveUsers)

module.exports = router;
