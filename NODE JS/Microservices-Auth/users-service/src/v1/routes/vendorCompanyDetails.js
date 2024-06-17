const express = require('express');
const vendorCompanyDetailsController = require('../controllers/vendorCompanyDetails');
const { isValidPermissions } = require('../middleware/admin-auth');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');
const { VENDOR } = require('../config/assign-permission');


const router = express.Router();
router.get('/view-all',isValidPermissions(VENDOR.GET), vendorCompanyDetailsController.getAllVendor);
router.put('/commission/:userId',isValidPermissions(VENDOR.UPDATE),[validate(rules.updateVendorCommission)], vendorCompanyDetailsController.updateVendorCommission);

module.exports = router;
