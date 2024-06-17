/* eslint-disable no-unused-vars */
const { getOneOrder } = require("../../../../../order-service/src/v1/services/order");
const { getOneUser } = require("../../../../../users-service/src/v1/services/users");
const { getSettingValue } = require("../../helpers/chche-helper");
const { createTransaction, UpdateOrderStatus } = require("../../services/transaction");

const paytmApi = {
  paytmWebhook: async (req, res) => {
    try {
      const { event, payload } = req.body;
      const PAYTM_MERCHANT_KEY = await getSettingValue('PAYTM_MERCHANT_KEY');
      const PAYTM_MERCHANT_SALT = await getSettingValue('PAYTM_MERCHANT_SALT');
      const NODE_ENV = await getSettingValue('NODE_ENV');

      // Check if the event is a payment event
      const paymentEvents = ['payment.captured', 'payment.failed'];
      if (paymentEvents.includes(event)) {


        // Ensure that the environment variables are defined
        if (!NODE_ENV||!PAYTM_MERCHANT_KEY || !PAYTM_MERCHANT_SALT) {
          throw new Error('Paytm API keys are not defined for the current environment');
        }

        // Process the Paytm payload and extract relevant information
        const { ORDERID, TXNID, TXNAMOUNT, STATUS, BANKTXNID, BANKNAME, customerId } = payload;

        // Fetch additional customer and order details using ORDERID and customerId
        const orderDetails = await getOneOrder({ orderId: ORDERID });
        const customerDetails = await getOneUser({ userId: customerId });

        // Determine transaction status based on Paytm status
        let transactionStatus;
        if (STATUS === 'TXN_SUCCESS') {
          transactionStatus = 'Success';
        } else if (STATUS === 'TXN_FAILURE') {
          transactionStatus = 'Failed';
        } else {
          transactionStatus = 'Pending'; // Handle other transaction statuses as needed
        }

        // Additional details for transaction
        const additionalDetails = {
          paymentMethod: 'Paytm',
          timestamp: new Date().toISOString(),
          transactionId: TXNID,
          bankTransactionId: BANKTXNID,
          bankName: BANKNAME,
          customer: customerDetails,
          order: orderDetails
        };

        // Create new transaction in database
        await createTransaction({
          paymentGatewayId: 2, // Update with Paytm payment gateway ID
          orderId: ORDERID,
          customerId: customerId,
          transactionAmount: TXNAMOUNT,
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
        await UpdateOrderStatus(ORDERID, updateData);

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

module.exports = paytmApi;

