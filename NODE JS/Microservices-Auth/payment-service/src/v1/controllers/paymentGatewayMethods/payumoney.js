/* eslint-disable no-unused-vars */
const { getOneOrder } = require("../../../../../order-service/src/v1/services/order");
const { getOneUser } = require("../../../../../users-service/src/v1/services/users");
const { getSettingValue } = require("../../helpers/chche-helper");
const { createTransaction, UpdateOrderStatus } = require("../../services/transaction");

const payUmoneyApi = {
  payUmoneyWebhook: async (req, res) => {
    try {
      const { event, payload } = req.body;
      const PAYUMONEY_MERCHANT_KEY = await getSettingValue('PAYUMONEY_MERCHANT_KEY');
      const PAYUMONEY_MERCHANT_SALT = await getSettingValue('PAYUMONEY_MERCHANT_SALT');
      const NODE_ENV = await getSettingValue('NODE_ENV');
      // Event handling for both successful and failed payment events
      if (event === 'payment.success' || event === 'payment.failed') {

        // Ensure that the environment variables are defined
        if (!NODE_ENV || !PAYUMONEY_MERCHANT_KEY || !PAYUMONEY_MERCHANT_SALT ) {
          throw new Error('PayUmoney API keys are not defined for the current environment');
        }
        const { txnid, amount, status, orderId, customerId } = payload;

        // Fetch additional order details using productinfo or txnid
        const orderDetails = await getOneOrder({ orderId: orderId });

        // Fetch additional customer details using email or phone
        const customerDetails = await getOneUser({ userId: customerId });

        // Determine transaction status based on PayUmoney event
        const transactionStatus = status === 'success' ? 'Success' : 'Failed';

        // Additional details for transaction
        const additionalDetails = {
          paymentMethod: 'PayUmoney',
          timestamp: new Date().toISOString(),
          paymentId: txnid,
          paymentAmount: amount,
          paymentStatus: status,
          orderId: orderId,
          customerId: customerId,
          customer: customerDetails,
          order: orderDetails
        };

        // Create new transaction in database
        await createTransaction({
          paymentGatewayId: 2, // Update with PayUmoney payment gateway ID
          orderId: orderId,
          customerId: customerId,
          transactionAmount: amount,
          transactionStatus: transactionStatus,
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

module.exports = payUmoneyApi;
