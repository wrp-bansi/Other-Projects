const express = require("express");
const enquiriesController = require("../controllers/enquiry");
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { authenticateAndValidateRole } = require("../../../../report-service/src/v1/middleware/user-auth");
const router = express.Router();
const {isValidPermissions} = require("../../v1/middleware/admin-auth");
const {PRODUCT_ENQUIRIES} = require('../config/assign-permission');

// Define routes
router.post("/customer/enquiries/create",authenticateAndValidateRole(['2']),[validate(rules.createEnquiry)], enquiriesController.createEnquiry);
router.get("/vendor/enquiries/view-all",authenticateAndValidateRole(['1']), enquiriesController.viewAllProductsEnquiriesWithPagination);
router.get("/admin/enquiries/view-all",isValidPermissions(PRODUCT_ENQUIRIES.GET), enquiriesController.getAllProductsEnquiriesWithPagination);

module.exports = router;
