const express = require('express')
const authController = require('../controllers/admin-auth')
const router = express.Router()

// Admin Login
router.post('/login', authController.adminSingIn)
// router.post('/admin/register-user', authController.adminSingUp)

module.exports = router
