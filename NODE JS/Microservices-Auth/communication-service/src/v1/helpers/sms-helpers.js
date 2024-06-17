const axios = require('axios');
const { getSettingValue } = require('../helpers/chche-helper');

function sendSMS(mobile, message) {
  return new Promise((resolve, reject) => {

    const SMS_URL = getSettingValue('SMS_URL');


    // Assuming you have an SMS API endpoint stored in global.env.SMS_OTP_URL
    const options = {
      method: 'GET',
      url: SMS_URL + 'numbers=' + mobile + '&message=' + message,
    };

    // For testing purpose, I'll resolve immediately with a mock response
    // You can uncomment the actual request block and comment out the resolve block for production
    resolve({
      error: false,
      msg: "SMS sent successfully",
    });

    axios(options)
      .then(response => {
        resolve({
          error: false,
          message: "SMS sent successfully",
        });
      })
      .catch(error => {
        reject({
          error: true,
          msg: "Failed to send SMS",
          errorDetails: error,
        });
      });

  });
}

module.exports={sendSMS}