const express = require('express');
const userRoleController = require('../controllers/userRole');
const { isValidPermissions } = require('../middleware/admin-auth');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');
const { USER_ROLE } = require('../config/assign-permission');

const router = express.Router();
router.get('/', isValidPermissions(USER_ROLE.GET), userRoleController.getAllUserRoles);
router.get('/view-all', isValidPermissions(USER_ROLE.GET), userRoleController.getAllUserRolewithpagination);
router.get('/:roleId', isValidPermissions(USER_ROLE.GET), userRoleController.getUserRoleById);
router.post('/create', [validate(rules.createUserRole)], isValidPermissions(USER_ROLE.CREATE), userRoleController.createUserRole);
router.put('/update/:roleId', [validate(rules.updateUserRole)], isValidPermissions(USER_ROLE.UPDATE), userRoleController.updateUserRole);
router.delete('/delete/:roleId', [validate(rules.deleteUserRole)], isValidPermissions(USER_ROLE.DELETE), userRoleController.deleteUserRole);
router.post('/bulk-delete', [validate(rules.bulkDeleteUserRoles)], isValidPermissions(USER_ROLE.DELETE), userRoleController.bulkDeleteUserRoles);

module.exports = router;
