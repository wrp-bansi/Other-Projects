/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { getOneOrder } = require("../../../../../order-service/src/v1/services/order");
const { getOneUser } = require("../../../../../users-service/src/v1/services/users");
const { getSettingValue } = require("../../helpers/chche-helper");
const { createTransaction, UpdateOrderStatus } = require("../../services/transaction");
const Razorpay = require('razorpay');

const razorpayApi = {
  razorpayWebhook: async (req, res) => {
    try {
      const { event, payload } = req.body;
      const RAZORPAY_KEY_ID = await getSettingValue('RAZORPAY_KEY_ID');
      const RAZORPAY_KEY_SECRET = await getSettingValue('RAZORPAY_KEY_SECRET');
      const NODE_ENV = await getSettingValue('NODE_ENV');
      // Check if the event is a payment event
      const paymentEvents = ['payment.captured', 'payment.failed'];
      if (paymentEvents.includes(event)) {
        // Ensure that the environment variables are defined
        if (!NODE_ENV ||!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
          throw new Error('Razorpay API keys are not defined for the current environment');
        }

        let razorpay;
        try {
          // Initialize Razorpay instance with appropriate API keys
          razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
          });
        } catch (error) {
          return res.status(400).send('Failed to initialize Razorpay instance');
        }

        // Verify if Razorpay instance is initialized successfully
        if (!razorpay) {
          throw new Error('Failed to initialize Razorpay instance');
        }

        const { entity } = payload;
        const { id, amount, status, orderId, customerId } = entity;

        // Fetch additional customer and order details using orderId and customerId
        const orderDetails = await getOneOrder({ orderId });
        // Increment product quantities for each order item
        const customerDetails = await getOneUser({ userId: customerId });

        // Determine transaction status based on Razorpay event
        const transactionStatus = status === 'captured' ? 'Success' : 'Failed';

        // Additional details for transaction
        const additionalDetails = {
          paymentMethod: 'Razorpay',
          timestamp: new Date().toISOString(),
          paymentId: id,
          paymentAmount: amount / 100, // Convert amount to rupees
          paymentStatus: status,
          orderId,
          customerId,
          customer: customerDetails,
          order: orderDetails
        };

        // Create new transaction in database
        await createTransaction({
          paymentGatewayId: 1, // Update with Razorpay payment gateway ID
          orderId,
          customerId,
          transactionAmount: amount / 100, // Convert amount to rupees
          transactionStatus,
          transactionDetails: { ...additionalDetails }
        });

        const orderStatus = transactionStatus === 'Success' ? 'Processing' : 'Cancelled';

        // Prepare data for updating order status
        const updateData = {
          orderStatus,
          email: customerDetails.email,
          username: customerDetails.firstName,
          orderItems: orderDetails.OrderItems
        };
        // Call UpdateOrderStatus function
        await UpdateOrderStatus(orderId, updateData);
      }

      // Send success response
      res.status(200).send('Webhook received and processed successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

module.exports = razorpayApi;
