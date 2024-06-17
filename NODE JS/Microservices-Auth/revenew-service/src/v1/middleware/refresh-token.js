
const { verifyRefreshToken, generateRefreshToken, verifyToken } = require('../helpers/auth-helpers');
const { updateAdminLoginWithToken } = require('../../../../auth-service/src/v1/services/admin');

const refreshTokenMiddleware = async (req, res, next) => {
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
};

module.exports = refreshTokenMiddleware;
