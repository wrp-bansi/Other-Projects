// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  customerId: String,
  amount: Number,
});

module.exports = mongoose.model('Payment', PaymentSchema);
