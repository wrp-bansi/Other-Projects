
// const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {Developer }=require('../models')

exports.signup = async (req, res) => {
    const { name,email, password,image,team_id,dob,isActive } = req.body;

    try {
        const existingEmployee = await Developer.findOne({ where: { email,team_id } });

        if (existingEmployee) {
            return res.status(400).json({ error: true, msg: 'Employee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newEmployee = await Developer.create({ name,email,image,team_id,dob,isActive, password: hashedPassword });

        res.status(201).json({ error: false, data: newEmployee, msg: "Signup successfully" });
    } catch (error) {
        res.status(500).json({ error: true, msg: "Error signing up" });
    }
};
