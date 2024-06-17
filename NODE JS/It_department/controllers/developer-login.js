const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Developer } = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    try {
        const existingDeveloper = await Developer.findOne({ where: { email } });

        if (!existingDeveloper) {
            return res.status(400).json({ error: true, msg: 'Developer does not exist' });
        }

        const passwordMatch = await bcrypt.compare(password, existingDeveloper.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: true, msg: "Invalid password" });
        }
        if (!existingDeveloper.isActive) {
            return res.status(401).json({ error: true, msg: "Developer is not active" });
        }
        const token = jwt.sign({ id: existingDeveloper.id }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ error: false, token, data: existingDeveloper });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, msg: "Error logging in" });
    }
};
