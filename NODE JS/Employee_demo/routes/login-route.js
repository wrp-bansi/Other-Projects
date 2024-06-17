
const express = require('express');
const router = express.Router();
const { login, upload, removeUser } = require('../controllers/login-controller');
const { signUpValidation } = require('../middleware/validation');

router.post('/', login);
router.put('/:id',signUpValidation,upload)
 router.delete('/:id',removeUser)

module.exports = router;
