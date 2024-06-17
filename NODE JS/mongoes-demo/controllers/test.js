const test=require('../models/test')

const showUsers = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = 1;
        const skip = (page - 1) * pageSize;


        const result = await test.find().skip(skip).limit(pageSize);

        res.status(200).json({ error: false, message: "data fetched successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
}

const createUsers=(async (req, res)=>{
    const { firstName, lastName, email } = req.body
    try {
        const result = await test.create({ firstName, lastName, email })
        res.status(201).json({ error: false, message: "data created successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
})

const showSingleUser=(async (req, res)=>{
    const { id } = req.params

    try {
        const result = await test.findById(id)
        res.status(200).json({ error: false, message: "data fetched successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
})

const updateUser=(async (req, res)=>{
    const { id } = req.params;

    const { firstName, lastName, email } = req.body;


    try {
        const result = await test.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
        if (!result) {
            return res.status(404).json({ error: true, message: "User not found", data: {} });
        }
        res.status(200).json({ error: false, message: "User updated successfully", data: result });
    } catch (error) {

        res.status(500).json({ error: true, message: "Internal Error", data: {} });
    }
})

const deleteUser=(async (req, res)=>{
    const { id } = req.params;

    try {
        const result = await test.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: true, message: "User not found", data: {} });
        }
        res.status(200).json({ error: false, message: "User deleted successfully", data: {} });
    } catch (error) {

        res.status(500).json({ error: true, message: "Internal  surver Error", data: {} });
    }
})


module.exports={
    showUsers,
    createUsers,
    showSingleUser,
    updateUser,
    deleteUser
}