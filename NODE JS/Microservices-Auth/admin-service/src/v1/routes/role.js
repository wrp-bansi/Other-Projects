const express = require('express');
const roleController = require('../controllers/role');
const { isValidPermissions } = require('../middleware/admin-auth');
const { validate } = require('../middleware/validation');
const rules = require('../middleware/validation-rules');
const { ROLE } = require('../config/assign-permission');

const router = express.Router();
router.get('/', isValidPermissions(ROLE.GET), roleController.getAllRoles);
router.get('/view-all', isValidPermissions(ROLE.GET), roleController.getAllRolewithpagination);
router.get('/:roleId', isValidPermissions(ROLE.GET), roleController.getRoleById);
router.post('/create/', [validate(rules.createRole)], isValidPermissions(ROLE.CREATE), roleController.createRole);
router.put('/update/:roleId', [validate(rules.updateRole)], isValidPermissions(ROLE.UPDATE), roleController.updateRole);
router.delete('/delete/:roleId', [validate(rules.deleteRole)], isValidPermissions(ROLE.DELETE), roleController.deleteRole);
router.post('/bulk-delete', [validate(rules.bulkDeleteRoles)], isValidPermissions(ROLE.DELETE), roleController.bulkDeleteRoles);

module.exports = router;
