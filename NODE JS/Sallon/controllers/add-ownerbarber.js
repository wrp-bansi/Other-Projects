const { Owner, Barber } = require('../models');


exports.addOwner = async (req, res) => {

    const { firstName, lastName, email, password, mobileNumber, role } = req.body;

    try {
        const addowner = await Owner.create({ firstName, lastName, email, password, mobileNumber, role });
        res.status(200).json({ error: false, data: addowner, msg: "owner added successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.addBarber = async (req, res) => {
    const { saloonId, firstName, lastName, ratting } = req.body;

    try {
        const barber = await Barber.create({ saloonId, firstName, lastName, ratting });
        res.status(200).json({ error: false, data: barber, msg: "barber added successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};