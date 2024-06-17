
const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");
const redisClient = require('../config/redis');
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);

const adminMiddleware = {
  isValidPermissions: (singlePermissionId = "") => {
    return async (req, res, next) => {
      try {
        const token = req.headers["authorization"];
        const xApiKey = req.headers["x-api-key"];

        logger.info("token"+ token);
        logger.info("xApiKey"+xApiKey);

        if (!token || !xApiKey) {
          console.log("Token or xApiKey missing.");
          return res.status(400).send({
            error: true,
            msg: "Both token and API key are required.",
          });
        }

        if (singlePermissionId === "") {
          console.log("Permission ID missing.");
          return res.status(400).send({
            error: true,
            msg: "Permission ID must be required to pass.",
          });
        }

        const tokenBody = token.slice(7); // Bearer slice
        console.log("Token Body:", tokenBody);

        jwt.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            console.log("Token verification error:", err);
            return res.status(400).send({
              error: true,
              isTokenExpired: true,
              msg: "Invalid token. Please log in again.",
            });
          }
          req.body.admin = {
            adminId: decoded.adminId,
          };

          if (decoded.isSuperAdmin === "yes") {
            next();
          } else {
            // Fetch permissions from Redis
            const permissionsKey = `permissions:${decoded.adminId}`;
            const permissionsFromRedis = await getAsync(permissionsKey);

            if (!permissionsFromRedis) {
              return res.status(400).send({
                error: true,
                msg: "Permissions not found. Please log in again to refresh permissions.",
              });
            }

            // Convert permissions from Redis to an array
            const redisPermissions = JSON.parse(permissionsFromRedis);

            // Check if the provided permission ID is included in Redis permissions
            if (redisPermissions.includes(singlePermissionId.toString())) {

              next();
            } else {
              return res.status(400).send({
                error: true,
                msg: "You have not sufficient permission to access this page.",
              });
            }
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
