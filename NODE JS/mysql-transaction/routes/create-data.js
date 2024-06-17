const { Router } = require('express');
const { createData } = require('../controler/create');
const router=Router()


router.post('/', createData)

module.exports=router



