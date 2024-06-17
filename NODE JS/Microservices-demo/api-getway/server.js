const express=require('express')

const gateway = require('fast-gateway')


const server = gateway({
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:8081'
        },
        {
            prefix: '/payment',
            target: 'http://localhost:8082'
        },

    ]
});

  server.get('/mytesting',(req,res)=>{
    res.send("yes work sucessfully")
  })

  server.start(9001).then(server=>{
    console.log("getway in running")
  })

