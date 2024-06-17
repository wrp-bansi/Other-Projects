// controllers/paymentController.js
const Payment = require('../models/Payment');

async function processPayment(call, callback) {
  const request = call.request;
  console.log('Received payment request:', request);

  const newPayment = new Payment({
    customerId: request.customerId,
    amount: request.amount,
  });

  try {
    await newPayment.save();
    console.log('Payment saved:', newPayment);
    callback(null, { success: true, message: 'Payment processed successfully' });
  } catch (err) {
    console.error('Error processing payment:', err);
    callback(err, null);
  }
}

module.exports = { processPayment };
