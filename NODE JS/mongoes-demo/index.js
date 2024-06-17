const express=require('express')
const testRouter=require('./routes/test')
const orderRouter=require('./routes/test2')
const connection=require('./coonection')
const bodyparser=require('body-parser')


const app=express()

connection.then(() => {
    console.log("Connection to MongoDB successful");

}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

//app.use(miidleware)
app.use(bodyparser.urlencoded({extended:false}))
app.use('/test', testRouter)
app.use('/order',orderRouter)

app.listen(8000,()=>{
    console.log("server started")
})


