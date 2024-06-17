const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");

const userMiddleware = {
  authenticateAndValidateRole: (roleIds = []) => {
    return async (req, res, next) => {
      try {
        const token = req.headers["authorization"];
        const xApiKey = req.headers["x-api-key"];

        logger.info("token" + token);
        logger.info("xApiKey" + xApiKey);

        if (!token || !xApiKey) {
          console.log("Token or xApiKey missing.");
          return res.status(400).send({
            error: true,
            msg: "Both token and API key are required.",
          });
        }

        const tokenBody = token.slice(7); // Bearer slice

        jwt.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            console.log("Token verification error:", err);
            return res.status(400).send({
              error: true,
              isTokenExpired: true,
              msg: "Invalid token. Please log in again.",
            });
          }

          const userRole = (decoded && decoded.userRole) ? decoded.userRole.toString() : null;

          if (!roleIds.includes(userRole)) {
            return res.status(403).json({
              error: true,
              msg: "Invalid user type or permission for this action.",
            });
          }
          // Attach decoded user information to the request object
          req.user = {
            userId: decoded.userId,
            role: decoded.userRole,
          };

          // Move to the next middleware
          next();
        });
      } catch (error) {
        return res.status(403).send({
          error: true,
          msg: "Authorization Error: " + error.message,
        });
      }
    };
  },

  authenticateUser: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const xApiKey = req.headers["x-api-key"];

      logger.info("token: " + token);
      logger.info("xApiKey: " + xApiKey);

      if (!token || !xApiKey) {
        console.log("Token or xApiKey missing.");
        return res.status(400).send({
          error: true,
          msg: "Both token and API key are required.",
        });
      }

      const tokenBody = token.slice(7); // Bearer slice

      jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("Token verification error:", err);
          return res.status(400).send({
            error: true,
            isTokenExpired: true,
            msg: "Invalid token. Please log in again.",
          });
        }

        req.body.user = {
          userId: decoded.userId,
          role: decoded.userRole,
        };

        next(); // Move next() inside the callback
      });
    } catch (error) {
      console.log("Authentication error:", error);
      return res.status(403).send({
        error: true,
        msg: "Authorization Error: " + error.message,
      });
    }
  },

};

module.exports = userMiddleware;
