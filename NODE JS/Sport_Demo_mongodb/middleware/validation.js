const {check}= require('express-validator')

exports.playerValidation = [
    check('name', 'Name must be provided').notEmpty(),
    check('age', 'Age must be provided').notEmpty().isInt({ min: 18, max: 30 }).withMessage('Age must be between 18 and 30'),
    check('captain', 'Captain name must be provided').notEmpty(),
    check('dob', 'Date of birth must be provided').notEmpty().isISO8601().withMessage('Invalid date of birth')
];