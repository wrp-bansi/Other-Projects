
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingEmployee = await User.findOne({ where: { email } });

        if (existingEmployee) {
            return res.status(400).json({ error: true, msg: 'Employee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const newEmployee = await User.create({ email, password: hashedPassword });

        res.status(201).json({ error: false, data: newEmployee, msg: "Signup successfully" });
    } catch (error) {
        res.status(500).json({ error: true, msg: "Error signing up" });
    }
};
