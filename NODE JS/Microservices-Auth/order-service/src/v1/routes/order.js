const express = require("express");
const orderController = require("../controllers/order");
const { isValidPermissions } = require("../middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { ORDER } = require('../config/assign-permission');
const { authenticateAndValidateRole } = require("../middleware/user-auth");

const router = express.Router();

// Define routes

//vendor
router.get("/vendor/order/view-all",authenticateAndValidateRole(["1"]), orderController.listOrdersOfVendor);

//customer
router.get("/customer/order/view-all", authenticateAndValidateRole(["2"]), orderController.viewOrders);


//admin
router.get("/admin/order/view-all",isValidPermissions(ORDER.GET), orderController.listOrders);
router.get("/:orderId", orderController.getOrderById);
router.post('/create', [validate(rules.addOrder)],orderController.addOrder)
router.put('/update/:orderId', [validate(rules.updateOrder)],orderController.updateOrder)
router.put('/update/status/:orderId',orderController.updateOrderStatus)
router.delete('/delete/:orderId',[validate(rules.deleteOrder)], orderController.deleteOrder)
router.post('/bulk-delete',[validate(rules.bulkDeleteOrders)],orderController.bulkDeleteOrders)

module.exports = router;
