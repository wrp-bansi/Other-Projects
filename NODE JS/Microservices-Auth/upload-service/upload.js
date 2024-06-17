const app = require("./src/app");
require("dotenv").config();
const logger = require("./src/v1/helpers/logger-helper");


// Set the IP address and port of the server
// eslint-disable-next-line no-unused-vars
const ipAddress = process.env.SERVER_IP_ADDRESS || "localhost";
const port = process.env.PORT || 8005;
app.listen(port, () => {
  logger.info(`Listening to port http://localhost:${port}`);
});
