const express=require('express')
const app=express()
const teamRouter=require('./controller/team-controller')
const playerRouter=require('./controller/players-controler')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))




app.use('/team',teamRouter)
app.use('/player',playerRouter)

app.listen(8000,()=>{
    console.log("server started....")
})