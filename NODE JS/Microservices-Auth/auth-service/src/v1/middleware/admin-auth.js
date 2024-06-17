const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger-helper");
const { verifyRefreshToken, generateRefreshToken, verifyToken } = require('../helpers/auth-helpers');
const { updateAdminLoginWithToken } = require('../../v1/services/admin');

const adminMiddleware = {
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
        if (singlePermission === "") {
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

          if (decoded.isSuperAdmin === "yes") {
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
  refreshTokenMiddleware : async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ error: true, message: 'Access token missing' });
      }
      // Check if access token is present in the request headers
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        return res.status(401).json({ error: true, message: "Access token missing" });
      }

      // Verify the access token
      const decodedToken = await verifyToken(accessToken, process.env.JWT_SECRET);

      // Check if access token is expired
      if (decodedToken.exp < Date.now() / 1000) {
        // Access token is expired
        const refreshToken = req.headers.refresh_token;
        if (!refreshToken) {
          return res.status(401).json({ error: true, message: "Refresh token missing" });
        }

        // Verify the refresh token
        const refreshDecoded = await verifyRefreshToken(refreshToken);
        if (refreshDecoded.exp < Date.now() / 1000) {
          // Refresh token is also expired, prompt user to log in again
          return res.status(401).json({ error: true, message: "Token expired. Please log in again." });
        }

        // Generate new access token using the refresh token payload
        const newAccessToken = generateRefreshToken(refreshDecoded);
        req.headers.authorization = `Bearer ${newAccessToken}`;

        // Update the access token in the database
        await updateAdminLoginWithToken(refreshDecoded.userId, newAccessToken);

        // Continue with the next middleware
        return next();
      }

      // Access token is valid, continue with the next middleware
      return next();
    } catch (error) {
      console.error("Error checking token expiry:", error);
      return res.status(500).json({ error: true, message: "Internal server error" });
    }
  }
};

module.exports = adminMiddleware;
