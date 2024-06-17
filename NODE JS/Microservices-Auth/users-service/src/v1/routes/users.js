const express = require('express')
const userController = require('../controllers/users')
const router = express.Router()
const {authenticateAndValidateRole} = require("../middleware/user-auth");
const {isValidPermissions}=require('../middleware/admin-auth')
const {USER} = require('../config/assign-permission');
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");

router.post('/create',[validate(rules.userSingUp)],userController.userSingUp)
router.get('/admin/xls', isValidPermissions(USER.GET),userController.downloadUsersAsXLS);
router.get('/admin/view-all', isValidPermissions(USER.GET), userController.getAllUserwithpagination)
router.get('/view-profile', authenticateAndValidateRole(['1','2']),userController.viewUserProfile)
router.get('/admin/', isValidPermissions(USER.GET), userController.getAllUsers)
router.get('/:userId', isValidPermissions(USER.GET), userController.getUserById)
router.put('/update/profile', authenticateAndValidateRole(['1','2']),userController.updateUserProfile)
router.put('/admin/update/:userId', [validate(rules.updateUser)], isValidPermissions(USER.UPDATE), userController.updateUser)
router.delete('/admin/delete/:userId',[validate(rules.deleteUser)], isValidPermissions(USER.DELETE),userController.deleteUser)
router.put('/admin/update/status/:userId',[validate(rules.updateStatus)], isValidPermissions(USER.UPDATE), userController.updateStatus)
router.post("/admin/bulk-delete",[validate(rules.bulkDeleteUsers)],isValidPermissions(USER.DELETE),userController.bulkDeleteUsers);

module.exports = router
