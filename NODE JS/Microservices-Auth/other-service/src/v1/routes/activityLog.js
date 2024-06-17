const express = require("express");
const activityLogsController = require("../controllers/activityLog");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { ACTIVITY_LOGS } = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(ACTIVITY_LOGS.GET), activityLogsController.getAllActivityLogswithPagination);
router.get("/", isValidPermissions(ACTIVITY_LOGS.GET), activityLogsController.getAllActivityLogs);
router.get("/:logId", isValidPermissions(ACTIVITY_LOGS.GET), activityLogsController.getActivityLogById);
router.post("/create",activityLogsController.createActivityLog);
router.delete("/delete/:logId", [validate(rules.deleteActivityLog)], isValidPermissions(ACTIVITY_LOGS.DELETE), activityLogsController.deleteActivityLog);
router.post("/bulk-delete",[validate(rules.bulkDeleteActivityLog)], isValidPermissions(ACTIVITY_LOGS.DELETE), activityLogsController.bulkDeleteActivityLogs);


module.exports = router;
