const mongoose = require('mongoose');
const User = require('../models/user');
const Address = require('../models/adress');





// const createData = async (req, res) => {
//     const { firstName, lastName, email, address, country, city } = req.body;

//     const session = await mongoose.connection.startSession();
//     session.startTransaction();

//     try {

//         const newAddress = await Address.create({ address, country, city });


//         const newUser = await User.create({ firstName, lastName, email, address: newAddress._id });

//         await session.commitTransaction();
//         session.endSession();

//         res.status(200).json({ message: 'User and Address created successfully' });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         console.error("Error creating user and address:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };



const createData = async (req, res) => {
    const { firstName, lastName, email, address, country, city } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newAddress = await Address.create(
            { address, country, city },
            { session: session }
        );

        const newUser = await User.create(
            { firstName, lastName, email, address: newAddress._id },
            { session: session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'User and Address created successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error creating user and address:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports={createData}