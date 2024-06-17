const express=require('express')
const router=express.Router()
const {createTeam, showTeam, showSingleTeam, deleteTeam, updateTeam}=require('../controllers/team-controller')



router.route('/')
.post(createTeam)
.get(showTeam)

router.route('/:id')
.get(showSingleTeam)
.put(updateTeam)
.delete(deleteTeam)
module.exports=router