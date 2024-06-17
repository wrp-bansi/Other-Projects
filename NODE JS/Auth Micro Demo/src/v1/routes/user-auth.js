const express = require('express')
const authController = require('../controllers/user-auth')
const router = express.Router()


// User
router.post('/register',  authController.userSingUp)
router.post('/active-status', authController.userActive)
router.post('/forgot-password', authController.forgotPassword)
router.post('/verify-otp', authController.verifyOtpUpdatePassword)
router.post('/update-password', authController.updatePassword)

router.post('/login', authController.userSingIn)

module.exports = router
