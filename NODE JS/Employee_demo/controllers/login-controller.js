const bcrypt = require('bcrypt');
const { User } = require('../models');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password})

    try {
        const existingEmployee = await User.findOne({ where: { email } });

        if (!existingEmployee) {
            return res.status(400).json({ error: true, msg: 'Employee not found' });
        }

        const passwordMatch = await bcrypt.compare(password, existingEmployee.password);
        console.log(passwordMatch)

        if (!passwordMatch) {
            return res.status(400).json({ error: true, msg: 'Invalid password' });
        }

        res.status(200).json({ error: false, msg: "Login successful", data: existingEmployee });
    } catch (error) {
        res.status(500).json({ error: true, msg: "Error logging in" });
    }
};


exports.upload = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { imagePath, email, password } = req.body;
    const { id } = req.params;

    try {
        const employee = await User.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: true, msg: 'Employee not found' });
        }


        if (password) {

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword)
            await employee.update({ imagePath, email, password: hashedPassword });
        } else {

            await employee.update({ imagePath, email });
        }

        res.status(200).json({ error: false, data: employee, msg: "User information updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: 'Internal server error' });
    }
}



exports.removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await User.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: true, msg: 'Employee not found' });
        }

        await employee.destroy()


        res.status(200).json({ error: false, data: { }, msg: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: 'Internal server error' });
    }
};


