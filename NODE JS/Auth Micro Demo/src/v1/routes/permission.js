const express = require("express");
const permission = require("../controllers/permission");
// const rules = require("../../validation-rules/country");
const { isValidPermissions } = require("../middleware/auth");

const router = express.Router();
// const morgan = require('morgan')
// router.use(morgan('combined'));

// Define routes
 router.get("/", isValidPermissions(30), permission.getPermissions);
router.get("/all", isValidPermissions(30), permission.getAllPermissions);
router.get("/parent", isValidPermissions(30), permission.getParentPermissions);
router.get("/:Id", isValidPermissions(30), permission.getPermissionById);
router.post("/", isValidPermissions(12),  permission.createPermission);
router.put("/:Id", isValidPermissions(18),  permission.updatePermission);
router.delete("/:Id", isValidPermissions(24),  permission.deletePermission);

module.exports = router;
