const express=require('express')
const bodyparser=require('body-parser')
const multer  = require('multer')
const app=express()
app.use(bodyparser.urlencoded({extended:false}))


const upload=multer({
    storage:multer.diskStorage({
        destination: function (req,file, cb){
             cb(null,"upload")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
        }
    })
}).single("userfile")


app.post('/upload',upload,(req,res)=>{
    res.send("hello")
})



app.listen(8000,(req,res)=>{
    console.log("server running")
})