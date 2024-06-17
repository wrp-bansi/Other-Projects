const express=require('express')
const user=require('./db/MOCK_DATA.json')
const app =express()
const port=8000

app.get('/api/users',(req,res)=>{
    res.json(user)
})


app.get('/api/user',(req,res)=>{

    const html=`
    <ul>

    ${user.map((user)=> `<li>${user.first_name}</li>`

    )}

    </ul>`
   res.send(html)
})


app.listen(port,()=>{
    console.log("server running" , port)
})