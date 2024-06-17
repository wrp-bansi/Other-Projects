const express = require("express");
const authController = require("../controllers/admin");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { isValidPermissions } = require("../middleware/auth");

const router = express.Router();
// const morgan = require('morgan')

// router.use(morgan('combined'))

router.post(
  "/admin/create",
  [validate(rules.adminSignup)], isValidPermissions(5),
  authController.adminCreate
);
// router.post('/admin/create', isValidPermissions(7), authController.adminCreate)

module.exports = router;
