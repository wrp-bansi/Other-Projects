const mongoose=require('mongoose')


const orderSchema = new mongoose.Schema({
    orderNumber:{
        type : Number,
        required:true,
    },
    orderName:{
        type : String,

    },
    test_id:{
        type: mongoose.Schema.Types.ObjectId, // Assuming this is a reference to the 'test' collection
        ref: 'test', // Reference to the 'test' collection
        required: true,

    },
},
{
    timestamps:true
})


const Order=mongoose.model('order',orderSchema)


module.exports=Order