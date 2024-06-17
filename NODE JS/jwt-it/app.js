const express=require('express')
const bodyparser=require('body-parser')
const signupRouter=require('./routes/signup')
const loginRouter=require('./routes/login')
const teamRouter=require('./routes/team')
const developerRouter=require('./routes/developer')

const app=express()


app.use(bodyparser.urlencoded({extended:false}))


app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/api',teamRouter)
app.use('/api',developerRouter)


app.listen(8000,()=>{
    console.log("sever running.....")
})