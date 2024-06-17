const express = require('express')
const authController = require('../controllers/adminAuth')
const router = express.Router()
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");


// Admin Login
router.post('/login',[validate(rules.adminLogin)],authController.adminSingIn)


module.exports = router
