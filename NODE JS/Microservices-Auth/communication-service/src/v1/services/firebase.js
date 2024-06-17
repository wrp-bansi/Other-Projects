const FCM = require("fcm-node");
const logger = require("../helpers/logger-helper");
const { getSettingValue } = require("../helpers/chche-helper");

// Function to chunk an array into smaller arrays
const chunkArray = (array, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

const sendNotificationToFirebase = async (registrationTokens, data) => {
  try {
    // Fetch Firebase Server Key from settings
    const SERVER_KEY = await getSettingValue('SERVER_KEY');

    // Check if SERVER_KEY is fetched successfully
    if (!SERVER_KEY) {
      throw new Error('Firebase Server Key not found');
    }

    // Initialize FCM with Firebase Server Key
    const fcm = new FCM(SERVER_KEY);
    // Divide registration tokens into chunks of 1000
    const registrationTokenChunks = chunkArray(registrationTokens, 1000);

    for (const registrationTokenChunk of registrationTokenChunks) {
      const message = {
        registrationIds: registrationTokenChunk,
        notification: {
          title: data.title,
          body: data.message,
        },
        data: data,
      };

      // Send notification
      fcm.send(message, (err, response) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(response);
        }
      });
    }
  } catch (error) {
    logger.error('Unexpected error while sending notifications:', error);
  }
};

module.exports = { sendNotificationToFirebase };
