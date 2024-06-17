require("dotenv").config();
const logger = require("./src/v1/helpers/logger-helper");

var port = 8095;
app.listen(port, () => {
  logger.info(`Listening to port http://localhost:${port}`);
});
