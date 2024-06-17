
const express = require('express');
const router = express.Router();
// const { signUpValidation } = require('../middleware/validation');
const { signup } = require('../controllers/signup');

router.post('/', signup);

module.exports = router;
