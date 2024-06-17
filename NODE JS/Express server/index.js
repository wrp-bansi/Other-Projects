const express=require('express')
const app=express()
const PORT=8000


app.get("/" ,(req,res)=>{
res.send("home page")
})

app.get("/about" ,(req,res)=>{
    // res.send("about page")
    res.send(`hello ${req.query.name} and age is ${req.query.age}`)
    })


app.listen(PORT,()=>{
    console.log( `server start at ${PORT}`)
})


