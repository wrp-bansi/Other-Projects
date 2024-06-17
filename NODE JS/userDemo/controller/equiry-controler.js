const { Router } = require("express");
const router = Router()
const { enquiry } = require('../models')



router.get('/', async (req, res) => {
    try {
        const enquiryes = await enquiry.findAll({ raw: true });
        res.status(200).json({ error: false, message: "User fetched successfully", data: enquiryes });
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to fetch users", data: {} });
    }
})

router.post('/post', async (req, res) => {
    const { user_id,subject } = req.body;
    try {
        const newenquiry = await enquiry.create({  user_id,subject  });
        res.status(201).json({ error: false, message: "enquiry created successfully", data: newenquiry });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
})



module.exports = router