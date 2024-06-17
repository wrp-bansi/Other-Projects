const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");

var adminMiddleware = {
  isValidPermissions: (singlePermission = "") => {
    return (req, res, next) => {
      // next();
      try {
        const token = req.headers["authorization"];
        const xApiKey = req.headers["x-api-key"];
        console.log(req.headers)
        logger.info("token"+ token);
        logger.info("xApiKey"+xApiKey);

        if (!token || !xApiKey) {
          return res.status(400).send({
            error: true,
            msg: "Both token and API key are required.",
          });
        }

        // if pass blank Permission
        if (singlePermission == "") {
          return res.status(400).send({
            error: true,
            msg: "Permission must be required to pass.",
          });
        }

        const tokenBody = token.slice(7); // Bearer slice
        logger.info("tokenBody", tokenBody);

        jwt.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            return res.status(400).send({
              error: true,
              isTokenExpired: true,
              msg: "Invalid token. Please log in again.",
            });
          }

          // Login Token Payloadkey decoded (if user side then req.body.user User login )
          req.body.admin = {
            adminId: decoded.adminId,
          };
          logger.info("req.body.admin---", req.body.admin);

          if (decoded.isSuperAdmin == "yes") {
            next();
          } else if (
            xApiKey === decoded.xApiKey &&
            decoded.permissions.includes(singlePermission.toString())
          ) {
            next();
          } else if (
            decoded.permissions.includes(singlePermission.toString())
          ) {
            next();
          } else {
            return res.status(400).send({
              error: true,
              msg: "You have not suffiant permission to access this page.",
            });
          }
        });
      } catch (error) {
        return res.status(403).send({
          error: true,
          msg: "Authorization Error: " + error.message,
        });
      }
    };
  },
};

module.exports = adminMiddleware;
