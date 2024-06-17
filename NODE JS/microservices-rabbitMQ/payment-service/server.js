// microservices/customer-service/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./connection/connection');
const PaymentRoutes = require('./routes/payment-routes');
const { sendMessageToRabbitMQ,sendAllpaymet } = require('../rabbitmq');


const app = express();
const PORT = 8082;

app.use(bodyParser.json());


app.use('/api', PaymentRoutes);

app.listen(PORT, () => {
    console.log(`Customer service is running on port ${PORT}`);
});

sendMessageToRabbitMQ();
sendAllpaymet();
