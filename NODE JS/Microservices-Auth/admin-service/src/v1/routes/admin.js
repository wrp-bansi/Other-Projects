const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { isValidPermissions } = require('../middleware/admin-auth');
const { ADMIN } = require('../config/assign-permission');

router.get('/', isValidPermissions(ADMIN.GET), adminController.getAllAdmins);
router.get('/view-all', isValidPermissions(ADMIN.GET), adminController.getAllAdminsWithPagination);
router.get('/:adminId', isValidPermissions(ADMIN.GET), adminController.getAdminById);
router.post('/create',[validate(rules.adminSignup)],adminController.adminCreate,);
router.put('/update/:adminId', [validate(rules.updateAdmin)], isValidPermissions(ADMIN.UPDATE), adminController.updateAdmin);
router.delete('/delete/:adminId', [validate(rules.deleteAdmin)], isValidPermissions(ADMIN.DELETE), adminController.deleteAdmin);
router.put('/update/status/:adminId',[validate(rules.updateAdminStatus)],isValidPermissions(ADMIN.UPDATE),adminController.updateAdminStatus);
router.post('/bulk-delete',[validate(rules.bulkDeleteAdmins)],isValidPermissions(ADMIN.DELETE),adminController.bulkDeleteAdmins);


module.exports = router;
