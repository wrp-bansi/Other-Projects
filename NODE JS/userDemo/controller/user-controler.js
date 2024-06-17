const { Router } = require("express");
const router = Router()
const { user } = require('../models')

router.post('/post', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = await user.create({ firstName, lastName, email, password });
        res.status(201).json({ error: false, message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const users = await user.findAll({ raw: true });
//         res.status(200).json({ error: false, message: "User fetched successfully", data: users });
//     } catch (error) {
//         res.status(500).json({ error: true, message: "Failed to fetch users", data: {} });
//     }
// })

// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const singleuser = await user.findByPk(id);
//         res.status(200).json({ error: false, message: "User fetched successfully", data: singleuser });
//     } catch (error) {
//         res.status(500).json({ error: true, message: "Failed to fetch users", data: {} });
//     }
// })

router.put('/:id',async (req,res)=>{
    const {id} =req.params
    const { firstName, lastName, email, password } = req.body;
    try{
        const singleuser = await user.findByPk(id);
        await singleuser.update({firstName, lastName, email, password })
        res.status(200).json({ error: false, message: "User updated successfully", data: singleuser });
    }catch(error){
        res.status(500).json({ error: true, message: "Failed to update users", data: {} });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const singleuser = await user.findByPk(id);
        await singleuser.destroy()
        res.status(200).json({ error: false, message: "User deleted successfully", data: {} });
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to delete users", data: {} });
    }
})

router.get('/lastrecord', async (req, res) => {
    try {
        // Get the total count of records in the User table
        const totalCount = await user.count();



        const lastThirdRecord = await user.findAll({ order: [['id', 'DESC']], limit: 3  });


        // Combine the last 3rd record with the total count
        const result = {
            lastThirdRecord,
            totalCount
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }


});

router.get('/lastUpdatedRecord', async (req, res) => {
    try {
        // Find the last updated record
        const lastUpdatedRecord = await user.findOne({ order: [['updatedAt', 'DESC']] });

        res.json(lastUpdatedRecord);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router