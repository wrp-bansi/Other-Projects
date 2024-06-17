const express = require("express");
const settingController = require("../controllers/setting");
const { isValidPermissions } = require("../../v1/middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { SETTING } = require('../config/assign-permission');
const router = express.Router();

// Define routes
router.get("/view-all", isValidPermissions(SETTING.GET), settingController.getAllSettingwithPagination);
router.get("/", isValidPermissions(SETTING.GET), settingController.getAllSettings);
router.get("/key-value", isValidPermissions(SETTING.GET), settingController.getKeyValues);
router.get("/:settingId", isValidPermissions(SETTING.GET), settingController.getSettingById);
router.post("/create", [validate(rules.createSetting)], isValidPermissions(SETTING.CREATE), settingController.createSetting);
router.put("/update/:settingId", [validate(rules.updateSetting)], isValidPermissions(SETTING.UPDATE), settingController.updateSetting);
router.delete("/delete/:settingId", [validate(rules.deleteSetting)], isValidPermissions(SETTING.DELETE), settingController.deleteSetting);
router.post("/bulk-update", isValidPermissions(SETTING.UPDATE),settingController.bulkUpdateSetting);


module.exports = router;
