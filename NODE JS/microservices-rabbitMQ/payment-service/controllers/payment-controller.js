

const Payment = require('../models/payment');
const { sendMessageToRabbitMQ, sendAllpaymet} = require('../../rabbitmq');

// Create payment
exports.createPayment = async (req, res) => {
    try {
        const { customerId, amount, status } = req.body;
        const payment = await Payment.create({ customerId, amount, status });

        // Notify the customer about the payment
        sendMessageToRabbitMQ({ customerId: req.body.customerId, message: 'Your payment has been processed.' });

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllPayments = async () => {
    try {
        const payments = await Payment.find();
        sendAllpaymet(payments);
        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
};







