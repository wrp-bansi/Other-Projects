const express=require('express')
const router=express.Router()
const {createTeam,showAllteamwithDeveloper}=require('../controllers/team')
const {authenticateToken}=require('../middleware/authenticateToken')

router.post('/', createTeam)
router.get('/',authenticateToken,showAllteamwithDeveloper)


module.exports=router