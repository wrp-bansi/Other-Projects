const express = require('express')
const bodyparser = require('body-parser')
const userRouter = require('./routes/all-routes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const looginSinginRouter=require('./routes/loginsignin-routes')
const getsaloonbarber=require('./routes/getsaloonbarber-routes')
const addsalooRouter=require('./routes/addsaloon-routes')
const addratingRouter=require('./routes/addrating-routes')


const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api',looginSinginRouter),
app.use('/api', userRouter)
app.use('/api', getsaloonbarber)
app.use('/api', addsalooRouter)
app.use('/api',addratingRouter)


app.listen(8000, () => {
    console.log("sever running.....")
})