const dotenv = require('dotenv');
dotenv.config();
const port=process.env.PORT
const express = require("express");
const app=express();
const bodyParser = require('body-parser');
const userrouter = require('./controller/user.controler');
const equiryrouter=require('./controller/equiry.controler')
const joinrouter=require('./controller/join.controler')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const rowqquieiesrouter=require('./controller/rowquires.controler')


 app.use('/user', userrouter)
app.use('/enquiry', equiryrouter)
app.use('/rwaquires', rowqquieiesrouter)
app.use('/join',joinrouter)


app.listen(port,()=>{
    console.log("server start",port);
})


