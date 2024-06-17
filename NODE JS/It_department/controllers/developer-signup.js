const {Developer}= require('../models')
const bcrypt=require('bcrypt')


exports.signup=async(req,res)=>{
const {email, password, name, image, team_id, dob, isActive}=req.body

try{

    if (!email || !password || !team_id) {
        return res.status(400).json({ error: true, msg: 'Email, password, and team_id are required' });
    }
    const extingDeveloper= await Developer.findOne({ where: { email } });
    if(extingDeveloper){
        return res.status(400).json({ error: true, msg: 'developer already exists' });
    }

    const hashpassword=await bcrypt.hash(password , 10)
    const newDeveloper = await Developer.create({email,  name, image, team_id, dob, isActive,password:hashpassword});

            res.status(201).json({ error: false, data: newDeveloper, msg: "Signup successfully" });
}
catch(error){
    res.status(500).json({ error: true, msg: "Error signing up" });
}

}