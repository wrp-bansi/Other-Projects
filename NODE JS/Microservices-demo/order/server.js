const express=require('express')

const app=express()


app.get('/order-list',(req,res)=>{
let response={
    data:{
    item:[
        {
            id:1,
            name:'order1'
        },
        {
            id:2,
            name:'order2'
        }
    ]
}
}
res.status(200).json(response)
})

app.get('/',(req,res)=>{
    res.status(200).json({msg:"order called"})
})

app.listen(8081,()=>{
    console.log(" orser server runnnig")
})