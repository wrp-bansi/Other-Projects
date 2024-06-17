
const express = require('express');
const bodyParser = require('body-parser');
const createRouter=require('./router/create')
const mongoose = require('./connection/connection');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/create',createRouter)



const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



