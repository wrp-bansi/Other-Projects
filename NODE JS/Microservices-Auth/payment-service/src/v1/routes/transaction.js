const express = require("express");
const rozerpayController = require("../controllers/paymentGatewayMethods/rozerpay");
const paytmController= require('../controllers/paymentGatewayMethods/paytm')
const payUMoneyController=require('../controllers/paymentGatewayMethods/payumoney')
const paypalController=require('../controllers/paymentGatewayMethods/paypal')
const stripController=require('../controllers/paymentGatewayMethods/strip')
const transactionController=require('../controllers/transaction')
const { isValidPermissions } = require("../middleware/admin-auth");
const { TRANSACTION } = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const router = express.Router();

// Define routes
router.get("/admin/transactions/view-all",isValidPermissions(TRANSACTION.GET),transactionController.getAllTransactionwithPagination);
router.get("/user/transactions/view-all", authenticateAndValidateRole(["1","2"]),transactionController.viewTransactions);
router.post("/transactions/create/rozerpay",isValidPermissions(TRANSACTION.GET), rozerpayController.razorpayWebhook);
router.post("/transactions/create/paytm",isValidPermissions(TRANSACTION.GET), paytmController.paytmWebhook);
router.post("/transactions/create/payumoney",isValidPermissions(TRANSACTION.GET), payUMoneyController.payUmoneyWebhook);
router.post("/transactions/create/paypal",isValidPermissions(TRANSACTION.GET), paypalController.paypalWebhook);
router.post("/transactions/create/strip",isValidPermissions(TRANSACTION.GET),stripController.stripeWebhook);

module.exports = router;
