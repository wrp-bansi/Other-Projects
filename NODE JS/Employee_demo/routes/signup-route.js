
const express = require('express');
const router = express.Router();
const { signUpValidation } = require('../middleware/validation');
const { signup } = require('../controllers/signup-controller');

router.post('/', signUpValidation, signup);

module.exports = router;
