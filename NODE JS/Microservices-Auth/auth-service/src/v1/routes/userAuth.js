const express = require('express')
const authController = require('../controllers/userAuth')
const router = express.Router()
const { validate } = require("../middleware/validation");
const rules = require("../middleware/validation-rules");


// User
router.post('/login',[validate(rules.userLogin)], authController.userSingIn)

module.exports = router
