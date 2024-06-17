/* eslint-disable no-unused-vars */
const { getOneOrder } = require("../../../../../order-service/src/v1/services/order");
const { getOneUser } = require("../../../../../users-service/src/v1/services/users");
const { getSettingValue } = require("../../helpers/chche-helper");
const { createTransaction, UpdateOrderStatus } = require("../../services/transaction");

const stripeApi = {
  stripeWebhook: async (req, res) => {
    try {
      const { event, data } = req.body;
      const STRIPE_API_KEY = await getSettingValue('STRIPE_API_KEY');
      const NODE_ENV = await getSettingValue('NODE_ENV');

      // Check if the event is a payment event
      const paymentEvents = ['payment_intent.succeeded', 'payment_intent.payment_failed'];
      if (paymentEvents.includes(event)) {
        if (!NODE_ENV ||!STRIPE_API_KEY) {
          throw new Error('Strip API keys are not defined for the current environment');
        }
        // Determine Stripe API credentials based on environment
        const stripeApiKey = STRIPE_API_KEY

        // Initialize Stripe with the appropriate API key
        const stripe = require('stripe')(stripeApiKey);

        const { id, amount, status, charges, customer } = data.object;

        // Extract order and customer details
        const orderId = charges.data[0].metadata.order_id;
        const customerId = customer;

        // Fetch additional customer and order details using orderId and customerId
        const orderDetails = await getOneOrder({ orderId });
        const customerDetails = await getOneUser({ userId: customerId });

        // Determine transaction status based on Stripe event
        const transactionStatus = status === 'succeeded' ? 'Success' : 'Failed';

        // Additional details for transaction
        const additionalDetails = {
          paymentMethod: 'Stripe',
          timestamp: new Date().toISOString(),
          paymentId: id,
          paymentAmount: amount / 100, // Amount is in smallest currency unit (cents), converting to dollars
          paymentStatus: status,
          orderId,
          customerId,
          customer: customerDetails,
          order: orderDetails
        };

        // Create new transaction in database
        await createTransaction({
          paymentGatewayId: 5, // Update with Stripe payment gateway ID
          orderId,
          customerId,
          transactionAmount: amount / 100, // Amount is in smallest currency unit (cents), converting to dollars
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
      // Error handling
      res.status(400).send({ error: true, msg: error.message });
    }
  }
};

module.exports = stripeApi;
