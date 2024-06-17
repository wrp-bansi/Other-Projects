const { Barber, Saloon ,Owner} = require('../models');


exports.getSaloon = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const offset = (page - 1) * pageSize;
        const saloon = await Saloon.findAndCountAll({
            offset,
            limit: pageSize,
            include: [{
                model: Owner,
                as: 'owner',
                attributes: ['firstName', 'lastName', 'email', 'mobileNumber']
            }]

        })
        res.status(200).json({ error: false, data: saloon, msg: "saloon fetched successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(400).json({ error: true, msg: error.message });
    }
};

exports.getBarber = async (req, res) => {


    try {

        const barber = await Barber.findAll({
            include: [
                {
                    model: Saloon,
                    attributes: ['ownerId','saloonName','mobileNumber','ratting'],
                    include: [
                        {
                            model: Owner,
                            as: 'owner',
                            attributes: ['firstName','lastName', 'email', 'mobileNumber']
                        }
                    ]
                }
            ]
        })
        res.status(200).json({ error: false, data: barber, msg: "barber fetched successfully" });
    } catch (error) {
        console.error('Error adding saloon:', error);
        res.status(400).json({ error: true, msg: error.message });
    }
};


