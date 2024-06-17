const express = require("express");
const role = require("../controllers/role");
const { isValidPermissions } = require("../middleware/auth");

const router = express.Router();
router.get('/pagination',isValidPermissions(4),role.getAllRolewithpagination)
  router.get("/",isValidPermissions(4),  role.getAllRoles);
  router.get("/:roleId", isValidPermissions(4), role.getRoleById);
  router.post("/", isValidPermissions(7), role.createRole);
  router.put("/:roleId", isValidPermissions(10), role.updateRole);
  router.delete("/:roleId", isValidPermissions(13), role.deleteRole);

  module.exports = router;
