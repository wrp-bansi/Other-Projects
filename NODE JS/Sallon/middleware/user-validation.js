const Joi = require('joi');

// Define Joi schemas for request validation
const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobileNumber: Joi.string().required(),
    role: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const validateSignup = (req, res, next) => {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
    }
    next();
};


const validateLogin = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
    }
    next();
};

module.exports = { validateSignup, validateLogin };
