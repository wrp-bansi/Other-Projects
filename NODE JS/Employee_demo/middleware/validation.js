const { check } = require('express-validator');

exports.signUpValidation = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];
