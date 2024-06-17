const express = require("express");
const requestPaymentController = require("../controllers/requestPayment");
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const router = express.Router();

// Define routes
router.get("/",authenticateAndValidateRole(['1']),requestPaymentController.getAllRequestPaymentsRecords);
router.get("/view-all",authenticateAndValidateRole(['1']), requestPaymentController.getAllRequestPaymentsWithPagination);
router.get("/:id",authenticateAndValidateRole(['1']), requestPaymentController.getRequestPaymentById);
router.post("/create", authenticateAndValidateRole(['1']),[validate(rules.createRequestPayment)],requestPaymentController.createRequestPaymentRecord);
router.put("/update/:id",authenticateAndValidateRole(['1']),[validate(rules.updateRequestPayment)], requestPaymentController.updateRequestPaymentRecord);
router.delete("/delete/:id",authenticateAndValidateRole(['1']),[validate(rules.deleteRequestPayment)], requestPaymentController.deleteRequestPaymentRecord);
router.post("/bulk-delete",authenticateAndValidateRole(['1']),[validate(rules.bulkDeleteRequestPayments)], requestPaymentController.bulkDeleteRequestPaymentRecords);


module.exports = router;
