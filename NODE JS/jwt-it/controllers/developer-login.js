// controllers/login.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Developer } = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingEmployee = await Developer.findOne({ where: { email } });

        if (!existingEmployee) {
            return res.status(400).json({ error: true, msg: 'Employee not found' });
        }

        const passwordMatch = await bcrypt.compare(password, existingEmployee.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: true, msg: 'Invalid password' });
        }

        const token = jwt.sign({ id: existingEmployee.id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ error: false, msg: "Login successful", token, data: existingEmployee });
    } catch (error) {
        res.status(500).json({ error: true, msg: "Error logging in" });
    }
};
