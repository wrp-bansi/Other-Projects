const Player = require('../models/Player')
const { validationResult } = require('express-validator');


const createPlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name,age,captain,dob } = req.body
    try {
        const newPlayer = await Player.create({ name,age,captain,dob })
        res.status(201).json({ error: false, data: newPlayer, msg: "player Created sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const showPlayer = async (req, res) => {
    try {
        const allPlayers = await Player.find()
        res.status(200).json({ error: false, data: allPlayers, msg: "Player fetched sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const showSinglePlayer = async (req, res) => {
    const { id } = req.params
    try {
        const singlePlayer = await Player.findById( id )
        res.status(200).json({ error: false, data: singlePlayer, msg: "singlePlayer fetched sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const updatePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params
    const { name,age,captain,dob } = req.body
    try {
        const singlePlayer = await Player.findByIdAndUpdate( id,{ name,age,captain,dob },{new:true} )
        if (!singlePlayer) {
            return res.status(404).json({ error: true, message: "Player not found", data: {} });
        }
        res.status(200).json({ error: false, data: singlePlayer, msg: "updated sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}


const deletePlayer = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Player.findByIdAndDelete( id )
        if (!result) {
            return res.status(404).json({ error: true, message: " Player not found", data: {} });
        }
        res.status(200).json({ error: false, data: {}, msg: "Deleted sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}


module.exports = { createPlayer,showPlayer,showSinglePlayer,updatePlayer,deletePlayer }