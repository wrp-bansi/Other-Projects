const express=require('express')
const app=express()
const users=require('./db/MOCK_DATA.json')


//Create middleware using express
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const fs=require('fs')


//dotenv
//first npm install dotenv
require('dotenv').config()
console.log(`Hello ${process.env.port}`)


//Create routes using express
app.get('/api/users' ,(req,res)=>{
  return  res.json(users)
})


app.get('/api/user' ,(req,res)=>{
const html=`
<ul>
${users.map((user)=>`<li> ${user.first_name} </li>`).join("")}
</ul>
`
    res.send(html)
})


app.get('/api/users/:id' ,(req,res)=>{
    const id = parseInt(req.params.id);

  const user=  users.find(user => user.id === id);
  return  res.json(user)
})


app.post('/api/users' ,(req,res)=>{
    const body=req.body
    users.push({...body, id: users.length+1})
    fs.writeFile("./db/MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
        return res.json({status:"sucess",id:  users.length})
    })
})


//View engine EJS
//first: npm install ejs
app.set('view engine', 'ejs');
app.get('/',(req, res)=>{
    res.render('home', { name: 'Bansi' });
})

app.listen(process.env.port,()=>{
    console.log('server running', process.env.port)
})