
const express = require('express');
const router = express.Router();
const { login}=require('../controllers/login')
// const { signUpValidation } = require('../middleware/validation');

router.post('/', login);

module.exports = router;
