const app = require("./app");
require("dotenv").config();
const logger = require("./helpers/logger-helper");

var port =  8092;
app.listen(port, () => {
  logger.info(`Listening to port http://localhost:${port}`);
});
