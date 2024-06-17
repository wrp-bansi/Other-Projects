// const jwt = require("jsonwebtoken");
// const redisClient = require('../config/redis');
// const { promisify } = require("util");
// const getAsync = promisify(redisClient.get).bind(redisClient);


// const permissionsAndRolesMiddleware = {
//   checkPermissionsAndRoles: (singlePermissionId = "") => {
//     return async (req, res, next) => {
//       try {
//         const token = req.headers["authorization"];
//         const xApiKey = req.headers["x-api-key"];

//         if (!token || !xApiKey) {
//           return res.status(400).send({
//             error: true,
//             msg: "Both token and API key are required.",
//           });
//         }

//         const tokenBody = token.slice(7); // Bearer slice
//         const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);

//         if (decoded.adminId) {
//           // Admin-specific permission check
//           if (singlePermissionId === "") {
//             return res.status(400).send({
//               error: true,
//               msg: "Permission ID must be required to pass.",
//             });
//           }

//           req.body.admin = {
//             adminId: decoded.adminId,
//           };

//           if (decoded.isSuperAdmin === "yes") {
//             next();
//           } else {
//             // Fetch permissions from Redis
//             const permissionsKey = `permissions:${decoded.adminId}`;
//             const permissionsFromRedis = await getAsync(permissionsKey);

//             if (!permissionsFromRedis) {
//               return res.status(400).send({
//                 error: true,
//                 msg: "Permissions not found. Please log in again to refresh permissions.",
//               });
//             }

//             const redisPermissions = JSON.parse(permissionsFromRedis);

//             if (redisPermissions.includes(singlePermissionId.toString())) {
//               next();
//             } else {
//               return res.status(400).send({
//                 error: true,
//                 msg: "You do not have sufficient permission to access this page.",
//               });
//             }
//           }
//         } else {
//           req.body.user = {
//             userId: decoded.userId,
//             role: decoded.userRole,
//           };
//           // Check if user is a customer
//           if (req.body.user.role === 2) {
//             return res.status(403).send({
//               error: true,
//               msg: "You do not have permission to access this page as a customer.",
//             });
//           }

//           next();
//         }
//       } catch (error) {
//         return res.status(403).send({
//           error: true,
//           msg: "Authorization Error: " + error.message,
//         });
//       }
//     };
//   },

// };

// module.exports = permissionsAndRolesMiddleware;

const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const { promisify } = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);

const permissionsAndRolesMiddleware = {
  checkPermissionsAndRoles: (singlePermissionId = '') => {
    return async (req, res, next) => {
      try {
        const token = req.headers['authorization'];
        const xApiKey = req.headers['x-api-key'];

        if (!token || !xApiKey) {
          return res.status(400).send({
            error: true,
            msg: 'Both token and API key are required.',
          });
        }

        const tokenBody = token.slice(7); // Remove "Bearer " from token
        const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);

        if (decoded.adminId) {
          // Admin-specific permission check
          if (singlePermissionId === '') {
            return res.status(400).send({
              error: true,
              msg: 'Permission ID must be required to pass.',
            });
          }

          req.user = {
            userId: decoded.adminId, // Use adminId as userId for consistency
            role: 'admin',
            isSuperAdmin: decoded.isSuperAdmin === 'yes',
          };

          if (req.user.isSuperAdmin) {
            return next();
          }

          // Fetch permissions from Redis
          const permissionsKey = `permissions:${decoded.adminId}`;
          const permissionsFromRedis = await getAsync(permissionsKey);

          if (!permissionsFromRedis) {
            return res.status(400).send({
              error: true,
              msg: 'Permissions not found. Please log in again to refresh permissions.',
            });
          }

          const redisPermissions = JSON.parse(permissionsFromRedis);

          if (redisPermissions.includes(singlePermissionId.toString())) {
            return next();
          } else {
            return res.status(400).send({
              error: true,
              msg: 'You do not have sufficient permission to access this page.',
            });
          }
        } else {
          req.user = {
            userId: decoded.userId,
            role: decoded.userRole,
          };

          if (req.user.role === 2) {
            return res.status(403).send({
              error: true,
              msg: 'You do not have permission to access this page as a customer.',
            });
          }

          next();
        }
      } catch (error) {
        return res.status(403).send({
          error: true,
          msg: 'Authorization Error: ' + error.message,
        });
      }
    };
  },
};

module.exports = permissionsAndRolesMiddleware;

