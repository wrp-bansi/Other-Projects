const express = require("express");
const dashboardController = require("../controllers/dashboard");
const {isValidPermissions} = require("../../v1/middleware/admin-auth");
const {DASHBOARD} = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const router = express.Router();

// Define routes
router.get("/admin/dashboard", isValidPermissions(DASHBOARD.GET),dashboardController.updateDashboard);
router.get('/vendor/dashboard',authenticateAndValidateRole(['1']),dashboardController.getDashboardCountsOfVendor)
//user report
router.get('/customer/dashboard',authenticateAndValidateRole(['2']),dashboardController.getDashboardCountsOfCustomer)

module.exports = router;
