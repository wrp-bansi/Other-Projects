const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");

const userMiddleware = {

  authenticateUser: (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const xApiKey = req.headers["x-api-key"];
      console.log(req.headers);
      logger.info("token" + token);
      logger.info("xApiKey" + xApiKey);

      if (!token || !xApiKey) {
        return res.status(400).send({
          error: true,
          msg: "Both token and API key are required.",
        });
      }

      const tokenBody = token.slice(7); // Remove 'Bearer ' prefix
      logger.info("tokenBody", tokenBody);

      jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).send({
            error: true,
            isTokenExpired: true,
            msg: "Invalid token. Please log in again.",
          });
        }

        req.body.user = {
          userId: decoded.userId,
        };
        logger.info("req.body.user", req.body.user);

        next();
      });
    } catch (error) {
      return res.status(403).send({
        error: true,
        msg: "Authorization Error: " + error.message,
      });
    }
  },
}

module.exports = userMiddleware;


