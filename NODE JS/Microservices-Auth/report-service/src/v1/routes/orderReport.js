const express = require("express");
const orderReportController = require("../controllers/orderReport");
const {isValidPermissions} = require("../middleware/admin-auth");
const {ORDER_REPOART} = require('../config/assign-permission');
const router = express.Router();


// Define routes
router.get("/admin/orders/last15daysorder",isValidPermissions(ORDER_REPOART.GET),orderReportController.getLast15DaysOrderStatus);
router.get('/admin/orders/filter',isValidPermissions(ORDER_REPOART.GET), orderReportController.getOrdersByFilters)


module.exports = router;
