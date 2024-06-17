const express = require('express');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

logger.info('Hello, Winston!');

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
