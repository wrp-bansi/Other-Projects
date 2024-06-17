const express = require("express");
const vendorReportController = require("../controllers/vendorPanelReport");
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const router = express.Router();


//vendor side
router.get("/products/low-stock",authenticateAndValidateRole(['1']), vendorReportController.viewLowStockProducts);
router.get('/orders/most-sold-products',authenticateAndValidateRole(['1']),vendorReportController.getMostSoldProducts)
router.get('/orders/view-orders',authenticateAndValidateRole(['1']),vendorReportController.viewOrdersByFilters)
router.get('/orders/revenue',authenticateAndValidateRole(['1']),vendorReportController.generateMonthlyRevenue)


module.exports = router;
