const mongoose=require('mongoose')


const playerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,

    },
    captain:{
        type:String,
        required:true
    },
    dob:{
        type:Date,

    },
},

{
    timestamps:true
})

const Player=mongoose.model('Player',playerSchema)

module.exports=Player