const express = require('express')
const smsController = require('../controllers/sms')
const router = express.Router()
const { isValidPermissions } = require("../middleware/admin-auth");
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const { SMS } = require('../config/assign-permission');

router.post('/send-sms',[validate(rules.sendSMS)],isValidPermissions(SMS.SENE_SMS), smsController.sendSMS);

module.exports = router
