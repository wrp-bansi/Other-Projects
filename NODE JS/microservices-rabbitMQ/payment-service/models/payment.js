

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    customerId: String,
    amount: Number,
    status: String
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
