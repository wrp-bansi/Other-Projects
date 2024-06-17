
const { sendSMS } = require('../helpers/sms-helpers');

const smsApi = {

  sendSMS: async (req, res) => {
    try {
      const { mobile, message } = req.body;

      // Call sendSMS function
      const result = await sendSMS(mobile, message);

      // Respond with success message
      res.status(200).json({ data: result });
    } catch (error) {
      // Handle any errors
      res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = smsApi;
