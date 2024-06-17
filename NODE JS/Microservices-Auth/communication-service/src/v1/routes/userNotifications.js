const express = require("express");
const userNotificationController = require("../controllers/userNotifications");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { USER_NOTIFICATION } = require('../config/assign-permission');

const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(USER_NOTIFICATION.GET), userNotificationController.getAllUserNotificationwithpagination);
router.get("/", isValidPermissions(USER_NOTIFICATION.GET), userNotificationController.getAllUserNotifications);
router.get("/:userNotificationId", isValidPermissions(USER_NOTIFICATION.GET), userNotificationController.getUserNotificationById);
router.post("/create",[validate(rules.createUserNotification)],userNotificationController.createUserNotification);
router.put("/update/:userNotificationId",[validate(rules.updateUserNotification)], isValidPermissions(USER_NOTIFICATION.UPDATE), userNotificationController.updateUserNotification);
router.delete("/delete/:userNotificationId",[validate(rules.deleteUserNotification)], isValidPermissions(USER_NOTIFICATION.DELETE), userNotificationController.deleteUserNotification);
router.post("/bulk-delete",[validate(rules.bulkDeleteUserNotifications)],isValidPermissions(USER_NOTIFICATION.DELETE), userNotificationController.bulkDeleteUserNotifications);
router.put('/update/status/:userNotificationId',isValidPermissions(USER_NOTIFICATION.UPDATE),userNotificationController.updateUserNotificationStatus)


module.exports = router;
