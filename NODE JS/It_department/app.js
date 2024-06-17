const express=require('express')
const bodyparser=require('body-parser')
const singupRouter=require('./routes/signup')
const loginRouter=require('./routes/login')
const teamRouter=require('./routes/team')
const developerRouter=require('./routes/developer')
const app=express()
app.use(bodyparser.urlencoded({extended:false}))
app.use('/singup' , singupRouter)
app.use('/login',loginRouter)
app.use('/team', teamRouter)
app.use('/developer',developerRouter)


app.listen(8001,()=>{
    console.log("server running...")
})