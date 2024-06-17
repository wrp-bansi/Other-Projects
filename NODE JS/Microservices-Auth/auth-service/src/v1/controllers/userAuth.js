
const logger = require("../helpers/logger-helper");
const bcrypt = require("bcryptjs");
const { getOneUser, updateUser } = require('../services/users');


const authApi = {

  // User Login
  userSingIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find admin by email
      const user = await getOneUser({ email: email });

      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid password" });
      }
      // Check if user is banned
      if (user.userStatus === 'Banned') {
        return res.status(400).json({ error: true, msg: "User is banned" });
      }

      // Check if user is unverified (for vendors)
      if (user.userStatus === 'Unverified' && user.roleId === 1) {
        return res.status(400).json({ error: true, msg: "Vendor is not yet verified" });
      }
      // Determine user type
      const userType = user.roleId === 1 ? 'vendor' : 'customer';
      // Generate X-api-key
      const xApiKey = global.common.generateAlphNumricString(12);

      // Prepar Payload For token
      const tokenPayload = {
        userId: user.userId,
        xApiKey: xApiKey,
        userRole: user.roleId,
      };

      // Generate Token
      const token = global.auth.generateAuthToken(tokenPayload);

      // Update Login user with token
      await updateUser({ userId: user.userId }, {
        lastLoginAt: new Date(),
        tokenGeneratedAt: new Date(),
        xApiKey,
        token,
        tokenExpireAt: global.datetime.plusHourDate(global.env.TOKEN_EXPIRY_HOUR),
      });

      // Create activity log for user login
      const activityData = {
        userID: user.userId,
        tableName: 'users',
        activityType: 'login',
        timestamp: new Date(),
        details: {
          email: user.email,
          ip: req.ip,
        }
      };
      // Call the createActivityLog API in another microservice
      const method = 'POST';
      const url = process.env.CREATE_LOGS_URL;
      const headers = { 'Content-Type': 'application/json' };
      const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);

      if (activityLogApiResponse.error) {
        logger.error("Error creating activity log:", activityLogApiResponse); // Log the entire response object
        throw new Error(activityLogApiResponse.msg);
      }
      return res.status(200).json({
        error: false,
        msg: "User Login successfully",
        xApiKey: tokenPayload.xApiKey,
        token: token,
        userId: user.userId,
        tokenExpireAt: (process.env.TOKEN_EXPIRY_HOUR),
        userType: userType
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
}

module.exports = authApi;

