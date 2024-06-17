const { Saloon} = require('../models');



exports.addSaloon = async (req, res) => {

    const { saloonName, mobileNumber, ratting, ownerId } = req.body;

    try {
        const saloon = await Saloon.create({ saloonName, mobileNumber, ratting, ownerId });
        res.status(200).json({ error: false, data: saloon, msg: "saloon added successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};








