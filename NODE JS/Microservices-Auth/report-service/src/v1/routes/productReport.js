const express = require("express");
const productReportController = require("../controllers/productReport");
const {isValidPermissions} = require("../middleware/admin-auth");
const {PRODUCT_REPOART} = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const router = express.Router();

// Define routes
router.get("/admin/products/date",isValidPermissions(PRODUCT_REPOART.GET), productReportController.getProductsByCreationDate);
router.get("/admin/products/status", isValidPermissions(PRODUCT_REPOART.GET),productReportController.getProductsByStatus);
router.get("/admin/products/range", isValidPermissions(PRODUCT_REPOART.GET),productReportController.getProductsByStockRange);
router.get("/admin/products/lessthan10",isValidPermissions(PRODUCT_REPOART.GET), productReportController.getProductsLessThan10Stock);
router.get("/admin/products/outofstock",isValidPermissions(PRODUCT_REPOART.GET), productReportController.getOutOfStockProducts);

//customer side
router.get("/customer/products/filter", authenticateAndValidateRole(['2']),productReportController.getProductsByFilter);


module.exports = router;
