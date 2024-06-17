const axios = require('axios');
const logger = require('../helpers/logger-helper');
const { getSettingValue } = require('../helpers/chche-helper');

const sendNotificationToOneSignal = async (registrationTokens, data) => {
  try {
    // Fetch OneSignal API key from settings
    const ONE_SIGNAL_API_KEY = await getSettingValue('ONE_SIGNAL_API_KEY');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
    };

    // Fetch OneSignal app ID from settings
    const ONE_SIGNAL_APP_ID = await getSettingValue('ONE_SIGNAL_APP_ID');

    const payload = {
      appId: ONE_SIGNAL_APP_ID,
      includePlayerIds: registrationTokens,
      headings: { en: data.title },
      contents: { en: data.message },
      data: data,
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      { headers }
    );

    logger.info('Notification sent to OneSignal:', response.data);
  } catch (error) {
    logger.error('Error sending notification to OneSignal:', error.response.data);
    throw error;
  }
};

module.exports = { sendNotificationToOneSignal };
