const Team = require('../models/Team')


const createTeam = async (req, res) => {
    const { name } = req.body
    try {
        const newTeam = await Team.create({ name })
        res.status(201).json({ error: false, data: newTeam, msg: "team Created sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const showTeam = async (req, res) => {
    try {
        const allTeam = await Team.find()
        res.status(200).json({ error: false, data: allTeam, msg: "team fetched sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const showSingleTeam = async (req, res) => {
    const { id } = req.params
    try {
        const singleTeam = await Team.findById( id )
        res.status(200).json({ error: false, data: singleTeam, msg: "singleTeam fetched sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}

const updateTeam = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const singleTeam = await Team.findByIdAndUpdate( id,{name},{new:true} )
        if (!singleTeam) {
            return res.status(404).json({ error: true, message: "Team not found", data: {} });
        }
        res.status(200).json({ error: false, data: singleTeam, msg: "updated sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}


const deleteTeam = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Team.findByIdAndDelete( id )
        if (!result) {
            return res.status(404).json({ error: true, message: "Team not found", data: {} });
        }
        res.status(200).json({ error: false, data: {}, msg: "Deleted sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, msg: "Internal Server Error" })
    }
}


module.exports = { createTeam, showTeam,showSingleTeam,deleteTeam,updateTeam }