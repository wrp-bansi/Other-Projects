const express=require('express')

const app=express()


app.get('/payment-list',(req,res)=>{
let response={
    data:{
    item:[
        {
            id:1,
            name:'paymen1'
        },
        {
            id:2,
            name:'paymen2'
        }
    ]
}
}
res.status(200).json(response)
})

app.get('/payment',(req,res)=>{
    res.status(200).json({msg:"payment called"})
})

app.listen(8082,()=>{
    console.log(" payment server runnnig")
})