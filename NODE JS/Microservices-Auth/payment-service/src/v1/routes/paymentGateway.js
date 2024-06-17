const express = require("express");
const paymentGatewayController = require("../controllers/paymentGateway");
const { isValidPermissions } = require("../middleware/admin-auth");
const { PAYMENTGATEWAY } = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(PAYMENTGATEWAY.GET), paymentGatewayController.getAllPaymentGatewaywithPagination);
router.get("/", isValidPermissions(PAYMENTGATEWAY.GET), paymentGatewayController.getAllPaymentGateways);
router.get("/:paymentGatewayId", isValidPermissions(PAYMENTGATEWAY.GET), paymentGatewayController.getPaymentGatewayById);
router.post("/create/", isValidPermissions(PAYMENTGATEWAY.CREATE), paymentGatewayController.createPaymentGateway);
router.put("/update/:paymentGatewayId", isValidPermissions(PAYMENTGATEWAY.UPDATE), paymentGatewayController.updatePaymentGateway);
router.put('/update/status/:paymentGatewayId',isValidPermissions(PAYMENTGATEWAY.UPDATE),paymentGatewayController.updatePaymentGatewayStatus);

module.exports = router;
