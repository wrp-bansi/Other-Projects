

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
