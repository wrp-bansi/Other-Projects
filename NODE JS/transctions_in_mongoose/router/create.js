const { Router } = require("express");

const router=Router()
const {createData}=require('../controller/create')


router.post('/', createData)

module.exports=router