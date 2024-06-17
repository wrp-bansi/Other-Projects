const express = require("express");
const adminPanelController = require("../controllers/adminPanelReport");
const {isValidPermissions} = require("../middleware/admin-auth");
const {COMMISSION_REPOART} = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/commission/", isValidPermissions(COMMISSION_REPOART.GET),adminPanelController.getCommissionReport);
router.get("/top-vendor", isValidPermissions(COMMISSION_REPOART.GET),adminPanelController.getTopPerformingVendors);
router.get('/most-sold-products',isValidPermissions(COMMISSION_REPOART.GET),adminPanelController.getMostSoldProducts)

module.exports = router;
