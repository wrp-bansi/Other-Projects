const {Team,Developer}= require('../models')

exports.showAllDeveloperwithTeam=async(req,res)=>{
    const {email}=req.params
    try {
        const developer = await Developer.findOne({
            where: { email },
            include: [{
                model: Team,
                attributes: ['id', 'name']
            }]
        });
        if(!developer){
            res.status(400).json({ error: true,  msg: "Developer not found" });
        }
        res.status(200).json({ error: false, data: developer, msg: "Developers fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }

}


exports.sortingDeveloper=async(req,res)=>{
    try {
        const developer = await Developer.findAll({
            include: [{
                model: Team,
                attributes: ['id', 'name']
            }],
            order:[['dob', 'ASC']]
        });

        res.status(200).json({ error: false, data: developer, msg: "Developers fetched successfully with sorting" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: "Internal server error" });
    }

}