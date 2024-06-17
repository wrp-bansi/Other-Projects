

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./connection/connection');
const customerRoutes = require('./routes/customer-routes');
const { receiveNotificationsFromRabbitMQ,getAllPayment} = require('../rabbitmq');



const app = express();
const PORT = 8081;

app.use(bodyParser.json());



app.use('/api', customerRoutes);

app.listen(PORT, () => {
    console.log(`Customer service is running on port ${PORT}`);
});

receiveNotificationsFromRabbitMQ();
getAllPayment()
