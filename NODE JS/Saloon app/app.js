const express = require('express')
const bodyparser = require('body-parser')
const userRouter = require('./routes/all-routes')


const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

app.use('/api', userRouter)


app.listen(8000, () => {
    console.log("sever running.....")
})