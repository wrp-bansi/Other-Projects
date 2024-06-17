const { SaloonRatting, BarberRatting } = require('../models');

exports.addSaloonRating = async (req, res) => {

    const { saloonId, ratting, userId } = req.body;

    try {
        const addsaloonrating = await SaloonRatting.create({ saloonId, ratting, userId });
        res.status(201).json({ error: false, data: addsaloonrating, msg: "saloonRatting added successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.addBarberRating = async (req, res) => {

    const { barberId, ratting, userId } = req.body;

    try {
        const addbarberrating = await BarberRatting.create({ barberId, ratting, userId });
        res.status(201).json({ error: false, data: addbarberrating, msg: "barberRatting added successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
