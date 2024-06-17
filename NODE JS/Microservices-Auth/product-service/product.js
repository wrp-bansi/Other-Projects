const app = require("./src/app");
require("dotenv").config();
const logger = require("./src/v1/helpers/logger-helper");


const port = process.env.PORT || 8004;
app.listen(port, () => {
  logger.info(`Listening to port http://localhost:${port}`);
});
