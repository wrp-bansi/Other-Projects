const express=require('express')
const router=express.Router()
const {createPlayer,showPlayer,showSinglePlayer,updatePlayer,deletePlayer}=require('../controllers/player-controller')

const {playerValidation}=require('../middleware/validation')

router.route('/')
.post(playerValidation, createPlayer)
.get(showPlayer)

router.route('/:id')
.get(showSinglePlayer)
.put(playerValidation, updatePlayer)
.delete(deletePlayer)
module.exports=router