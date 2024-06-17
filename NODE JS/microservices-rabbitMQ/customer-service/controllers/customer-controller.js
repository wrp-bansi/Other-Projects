


const Customer = require('../models/customer');
const {getAllPayment} = require('../../rabbitmq');
const Payment = require('../../payment-service/models/payment');


exports.createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const newCustomer = await Customer.create({ firstName, lastName, email });
        res.status(201).json({ error: false, data: newCustomer, msg: 'Customer created successfully' });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Error creating customer' });
    }
};


exports.getCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
        const payments = await getAllPayment();
        const customersWithPayments = customers.map(customer => {
            const customerPayments = payments.filter(payment => payment.customerId === customer._id.toString());
            return { ...customer.toObject(), payments: customerPayments };
        });
        res.status(200).json({ error: false, data: customersWithPayments, msg: 'Customers with payments found successfully' });
    } catch (error) {
        console.error('Error fetching customers with payments:', error);
        res.status(500).json({ message: 'Error fetching customers with payments' });
    }
};





