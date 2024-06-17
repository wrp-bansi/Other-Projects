const express = require('express')
const emailController = require('../controllers/email')
const router = express.Router()
// const { validate } = require("../middleware/validation");
// const rules = require("../middleware/validation-rules");
// const { isValidPermissions } = require("../middleware/admin-auth");
// const { EMAIL } = require('../config/assign-permission');

router.post('/send-email', emailController.sendEmail);

module.exports = router
