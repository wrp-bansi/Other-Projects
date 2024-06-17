const {Team,Developer}= require('../models')



exports.createTeam=async(req,res)=>{
const {name}=req.body

try{
    const newTeam=await Team.create({name})

 res.status(201).json({ error: false, data: newTeam, msg: "team created successfully" });
}
catch(error){
    res.status(500).json({ error: true, msg: "Error not create team" });
}

}


exports.showAllteamwithDeveloper=async(req,res)=>{
    try {
        const teams = await Team.findAll({
            include: [{
                model: Developer,
                attributes: ['id', 'name', 'email','image', 'dob']
            }]
        });

        res.status(200).json({ error: false, data: teams, msg: "All teams with developers fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }

}