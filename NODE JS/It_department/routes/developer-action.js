const express=require('express')
const router=express.Router()
const {showAllDeveloperwithTeam,sortingDeveloper}=require('../controllers/developer')
const {authenticateToken}=require('../middleware/authenticateToken')


router.get('/:email',authenticateToken,showAllDeveloperwithTeam)
router.get('/',authenticateToken,sortingDeveloper)


module.exports=router