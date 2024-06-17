const { Router } = require("express");
const router=Router()
const {Player} =require ("../models")



router.post('/post' ,async(req,res)=>{

    const{ name,age,captain,dob } =req.body
    try{

        const newPlayer= await Player.create({   name,age,captain,dob})
        res.status(201).json({error:false , data: newPlayer , msg: "Players Created Sucessfully"})
    }catch{
        res.status(401).json({error:true ,  msg: "Players Not Created "})
    }

})
router.get('/' ,async(req,res)=>{
    try{
        const players= await Player.findAll()

        res.status(200).json({error:false , data: players , msg: "Players Fetched Sucessfully"})
    }catch{
        res.status(404).json({error:true ,  msg: "Players Not Found"})
    }

})

router.get('/:id' ,async(req,res)=>{
    const {id} =req.params
    console.log(id)
    try{
        const singlePlayer= await Player.findByPk(id)
        res.status(200).json({error:false , data: singlePlayer , msg: "Players Fetched Sucessfully"})
    }catch{
        res.status(404).json({error:true ,  msg: "Players Not Found"})
    }

})


router.put('/:id' ,async(req,res)=>{
    const {id} =req.params
    const{  name,age,captain,dob } =req.body


    try{
        const singlePlayer= await Player.findByPk(id)
        await singlePlayer.update({name,age,captain,dob })
        res.status(200).json({error:false , data: singlePlayer , msg: "Players Updated Sucessfully"})
    }catch{
        res.status(401).json({error:true ,  msg: "Players Not Updated"})
    }

})

router.delete('/:id' ,async(req,res)=>{
    const {id} =req.params

    try{
        const singlePlayer= await Player.findByPk(id)
        await singlePlayer.destroy()
        await sequelize.query("ALTER TABLE Players AUTO_INCREMENT = 1");
        res.status(200).json({error:false , data:{} , msg: "Players Deleted Sucessfully"})
    }catch{
        res.status(401).json({error:true ,  msg: "Players Not  deleted"})
    }

})

module.exports=router