const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const { User } = require('../models')






exports.signup = async (req, res) => {
    const { firstName, lastName, email, password, mobileNumber, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: true, msg: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, email, mobileNumber, role, password: hashedPassword });
        res.status(201).json({ error: false, data: newUser, msg: "Signup successfully" });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(400).json({ error: true, msg: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(400).json({ error: true, msg: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: true, msg: 'Invalid password' });
        }

        const tokenPayload = {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role // Include the user's role in the JWT token payload
        };
        const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ error: false, msg: "Login successful",token, data: existingUser });
    } catch (error) {
        res.status(400).json({ error: true, msg: error.message });
    }
};