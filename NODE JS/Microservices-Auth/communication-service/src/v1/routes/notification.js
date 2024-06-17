const express = require('express')
const notificationController = require('../controllers/notification')
const router = express.Router()
const { isValidPermissions } = require("../middleware/admin-auth");
const { NOTIFICATION } = require('../config/assign-permission');
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");

router.post('/notification/create', [validate(rules.createNotification)], isValidPermissions(NOTIFICATION.CREATE), notificationController.createNotification);
router.get('/', isValidPermissions(NOTIFICATION.GET), notificationController.getNotifications)
router.get('/notification/view-all', isValidPermissions(NOTIFICATION.GET), notificationController.getAllNotificationwithpagination)
router.delete('/notification/delete/:nId', [validate(rules.deleteNotification)], isValidPermissions(NOTIFICATION.DELETE), notificationController.deleteNotification)
router.post("/notification/bulk-delete", [validate(rules.bulkDeleteNotification)], isValidPermissions(NOTIFICATION.DELETE), notificationController.bulkDeleteNotifications);

module.exports = router
