const { sequelize, User, Adress } = require('../models');

const createData=async(req,res)=>{
    const { firstName, lastName, email, address, country, city } = req.body;

    try {

        const transaction = await sequelize.transaction();

        try {

            const user = await User.create({
                firstName,
                lastName,
                email
            }, { transaction });


            const createdAddress = await Adress.create({
                address,
                country,
                city
            }, { transaction });


            await transaction.commit();

            res.status(201).send({ user, address: createdAddress });
        } catch (error) {

            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error("Error creating user with address:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports={createData}