const express=require('express')
const app=express()
const createRouter=require('./routes/create')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/create', createRouter)

app.listen(8000,()=>{
    console.log("server started....")
})







