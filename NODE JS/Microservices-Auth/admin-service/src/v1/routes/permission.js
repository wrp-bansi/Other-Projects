const express = require('express');
const permissionController = require('../controllers/permission');
const { isValidPermissions } = require('../middleware/admin-auth');

const router = express.Router();
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');
const { PERMISSION } = require('../config/assign-permission');

// Define routes
router.get('/', isValidPermissions(PERMISSION.GET), permissionController.getPermissions);
router.get('/view-all', isValidPermissions(PERMISSION.GET), permissionController.getAllPermissionswithPagination);
router.get('/parent', isValidPermissions(PERMISSION.GET), permissionController.getParentPermissions);
router.get('/:permissionId', isValidPermissions(PERMISSION.GET), permissionController.getPermissionById);
router.post('/create/', [validate(rules.createPermission)], isValidPermissions(PERMISSION.CREATE), permissionController.createPermission);
router.put('/update/:permissionId', [validate(rules.updatePermission)], isValidPermissions(PERMISSION.UPDATE), permissionController.updatePermission);
router.delete('/delete/:permissionId', [validate(rules.deletePermission)], isValidPermissions(PERMISSION.DELETE), permissionController.deletePermission);
router.post('/bulk-delete', [validate(rules.bulkDeletePermissions)], isValidPermissions(PERMISSION.DELETE), permissionController.bulkDeletePermissions);

module.exports = router;
