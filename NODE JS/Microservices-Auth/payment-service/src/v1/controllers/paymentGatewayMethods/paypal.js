/* eslint-disable no-unused-vars */
const { getOneOrder } = require("../../../../../order-service/src/v1/services/order");
const { getOneUser } = require("../../../../../users-service/src/v1/services/users");
const { getSettingValue } = require("../../helpers/chche-helper");
const { createTransaction, UpdateOrderStatus } = require("../../services/transaction");

const paypalApi = {
  paypalWebhook: async (req, res) => {
    try {
      const { event, resource } = req.body;
      const PAYPAL_CLIENT_ID = await getSettingValue('PAYPAL_CLIENT_ID');
      const PAYPAL_SECRET = await getSettingValue('PAYPAL_SECRET');
      const NODE_ENV = await getSettingValue('NODE_ENV');

      // Check if the event is a payment event
      const paymentEvents = ['PAYMENT.CAPTURE.COMPLETED', 'PAYMENT.CAPTURE.DENIED'];
      if (paymentEvents.includes(event)) {
        // Ensure that the environment variables are defined
        if (NODE_ENV !== 'production' && (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET)) {
          throw new Error('PayPal API keys are not defined for the current environment');
        }

        // Process the PayPal payload and extract relevant information
        const { id, amount, status } = resource;
        const orderId = resource.invoice_id;
        const customerId = resource.payer.payer_id;

        // Fetch additional customer and order details using orderId and customerId
        const orderDetails = await getOneOrder({ orderId });
        const customerDetails = await getOneUser({ userId: customerId });

        // Determine transaction status based on PayPal event
        const transactionStatus = status === 'COMPLETED' ? 'Success' : 'Failed';

        // Additional details for transaction
        const additionalDetails = {
          paymentMethod: 'PayPal',
          timestamp: new Date().toISOString(),
          paymentId: id,
          paymentAmount: amount.value,
          paymentStatus: status,
          orderId,
          customerId,
          customer: customerDetails,
          order: orderDetails
        };

        // Create new transaction in database
        await createTransaction({
          paymentGatewayId: 4, // Update with PayPal payment gateway ID
          orderId,
          customerId,
          transactionAmount: amount.value,
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
      console.error('Error processing webhook:', error);
      res.status(400).send(error.message);
    }
  }
};

module.exports = paypalApi;
