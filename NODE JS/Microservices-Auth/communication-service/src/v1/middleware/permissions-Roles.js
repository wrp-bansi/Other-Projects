const jwt = require("jsonwebtoken");
const redisClient = require('../config/redis');
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);


const permissionsAndRolesMiddleware = {
  checkPermissionsAndRoles: (singlePermissionId = "") => {
    return async (req, res, next) => {
      try {
        const token = req.headers["authorization"];
        const xApiKey = req.headers["x-api-key"];

        if (!token || !xApiKey) {
          return res.status(400).send({
            error: true,
            msg: "Both token and API key are required.",
          });
        }

        const tokenBody = token.slice(7); // Bearer slice
        const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);

        if (decoded.adminId) {
          // Admin-specific permission check
          if (singlePermissionId === "") {
            return res.status(400).send({
              error: true,
              msg: "Permission ID must be required to pass.",
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

            const redisPermissions = JSON.parse(permissionsFromRedis);

            if (redisPermissions.includes(singlePermissionId.toString())) {
              next();
            } else {
              return res.status(400).send({
                error: true,
                msg: "You do not have sufficient permission to access this page.",
              });
            }
          }
        } else {
          req.body.user = {
            userId: decoded.userId,
            role: decoded.userRole,
          };
          // Check if user is a customer
          if (req.body.user.role === 2) {
            // Allow customers to create orders
            next();
          } else if (req.body.user.role === 1) {
            next();
          } else {
            return res.status(403).send({
              error: true,
              msg: "You do not have permission to access this page.",
            });
          }
        }
      } catch (error) {
        return res.status(403).send({
          error: true,
          msg: "Authorization Error: " + error.message,
        });
      }
    };
  },

};

module.exports = permissionsAndRolesMiddleware;
