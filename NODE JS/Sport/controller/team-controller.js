const { Router } = require("express");
const {Team} =require('../models')

const router=Router()

router.post('/post',async(req,res)=>{
    const {name} = req.body

    try{
        const newMamber= await Team.create({name})
        res.status(201).json({error:false,data:newMamber,msg:"TeamMamber Created Sucessfully"})
    }catch(error){
        res.status(401).json({error:true ,  msg: "TeamMamber Not Created "})
    }

})

router.get('/',async(req,res)=>{
    try{
        const teamMambers= await Team.findAll()
        res.status(200).json({error:false,data:teamMambers,msg:"Sucessfully Fetched TeamMamber"})
    }catch(error){
        res.status(404).json({error:true,msg:"Not Found TeamMamber"})
    }

})


router.get('/:id',async(req,res)=>{
    const {id}=req.params
  try{
    const singleMamber=await Team.findByPk(id)
    res.status(200).json({error:false,data:singleMamber,msg:"Sucessfully Fetched TeamMamber"})
  }catch(error){
    res.status(404).json({error:true,msg:"Not Found TeamMamber"})
}
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {name} = req.body
    try{
        const singleMamber=await Team.findByPk(id)
       await singleMamber.update({name})
        res.status(200).json({error:false,data:singleMamber,msg:"Sucessfully Updated TeamMamber"})
    }catch(error){
        res.status(401).json({error:true,msg:"TeamMamber Not Updated"})
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params

    try{
        const singleMamber=await Team.findByPk(id)
        await singleMamber.destroy()
        res.status(200).json({error:false,data:{},msg:"Sucessfully Deleted Record"})
      }catch(error){
        res.status(401).json({error:true,msg:"TeamMamber Not Deleted"})
    }
})


module.exports=router