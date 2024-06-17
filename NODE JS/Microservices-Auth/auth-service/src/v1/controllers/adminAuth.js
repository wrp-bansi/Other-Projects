
const bcrypt = require("bcryptjs");
const logger = require("../helpers/logger-helper");
const { getSingleAdmin, updateAdminLoginWithToken } = require("../services/admin");
const { getSingleRole } = require('../../../../admin-service/src/v1/services/role');
const redisClient = require('../config/redis')
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);
const setexAsync = promisify(redisClient.setex).bind(redisClient);
const { ADMIN, PERMISSION, ROLE } = require('../../../../admin-service/src/v1/config/assign-permission');
const {EMAIL,NOTIFICATION,SMS}=require('../../../../communication-service/src/v1/config/assign-permission')
const {ORDER,COUPON}=require('../../../../order-service/src/v1/config/assign-permission')
const {BACKUP, POST, POST_CATEGORY,POST_TYPES,SETTING,ACTIVITY_LOGS}=require('../../../../other-service/src/v1/config/assign-permission')
const {PAYMENTGATEWAY,TRANSACTION}=require('../../../../payment-service/src/v1/config/assign-permission')
const {CATEGORY,PRODUCT}=require('../../../../product-service/src/v1/config/assign-permission')
const {DASHBOARD,PRODUCT_REPOART,USER_REPOART,ORDER_REPOART}=require('../../../../report-service/src/v1/config/assign-permission')
const {UPLOAD}=require('../../../../upload-service/src/v1/config/assign-permission')
const {USER}=require('../../../../users-service/src/v1/config/assign-permission')

const authApi = {

  // adminSingIn: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;

  //     // Find admin by email
  //     const admin = await getSingleAdmin({ email: email });

  //     // Check if password is correct
  //     const isPasswordValid = await bcrypt.compare(password, admin.password);
  //     if (!isPasswordValid) {
  //       return res.status(400).json({ message: "Invalid password" });
  //     }

  //     // Find role by admin
  //     const checkRole = await getSingleRole({ roleId: admin.role });

  //     // Fetch permissions based on role
  //     const permissionsKey = `permissions:${admin.adminId}`; // Constructing key based on role ID
  //     let permissions = await getAsync(permissionsKey);

  //     // If permissions are not cached, fetch from the database and cache them
  //     if (!permissions) {
  //       permissions = checkRole.permission || [];
  //       // Cache permissions in Redis
  //       await setexAsync(permissionsKey, 3600, JSON.stringify(permissions));
  //     } else {
  //       permissions = JSON.parse(permissions);
  //     }

  //     // Generate X-api-key
  //     const xApiKey = global.common.generateAlphNumricString(12);

  //     // Prepare Payload For token
  //     const tokenPayload = {
  //       adminId: admin.adminId,
  //       isSuperAdmin: admin.isSuperAdmin,
  //       xApiKey: xApiKey,
  //       permissions: permissions,
  //     };

  //     // Generate Token
  //     const token = global.auth.generateAuthToken(tokenPayload);

  //     // Generate Token
  //     const refreshToken = global.auth.generateRefreshToken(tokenPayload);

  //     // Update Login admin with token
  //     await updateAdminLoginWithToken(
  //       { adminId: admin.adminId }, // updateParams
  //       { // updateData
  //         lastLoginAt: new Date(),
  //         tokenGeneratedAt: new Date(),
  //         xApiKey,
  //         token,
  //         refreshToken,
  //         tokenExpireAt: global.datetime.plusHourDate(global.env.TOKEN_EXPIRY_HOUR),
  //       }
  //     );

  //     // Create activity log for login
  //     const activityData = {
  //       userID: admin.adminId, // Assuming adminId is used as userID
  //       tableName: 'admins',
  //       activityType: 'login',
  //       timestamp: new Date(),
  //       details: {
  //         email: admin.email,
  //         ip: req.ip, // Assuming Express req object is used and IP is obtained from it
  //         // Add any other relevant details you want to log
  //       }
  //     };
  //     // Stringify the details field if it's an array or an object
  //     if (typeof activityData.details === 'object') {
  //       activityData.details = JSON.stringify(activityData.details);
  //     }
  //     // Call the createActivityLog API in another microservice
  //     const method = 'POST';
  //     const url = process.env.CREATE_LOGS_URL;
  //     const headers = {'Content-Type': 'application/json'};
  //     const activityLogApiResponse= await global.common.callMicroServiceApi(method, url,activityData,headers);

  //     if (activityLogApiResponse.error) {
  //       logger.error("Error creating activity log:", activityLogApiResponse); // Log the entire response object
  //       throw new Error(activityLogApiResponse.msg);
  //     }

  //     return res.status(200).json({
  //       error: false,
  //       msg: "Login successfully",
  //       xApiKey: tokenPayload.xApiKey,
  //       token: token,
  //       refreshToken:refreshToken,
  //       tokenExpireAt: (process.env.TOKEN_EXPIRY_HOUR), // Convert to seconds
  //     });
  //   } catch (error) {
  //     logger.error(error);
  //     return res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

  // adminSingIn: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     // Find admin by email
  //     const admin = await getSingleAdmin({ email: email });
  //     // Check if password is correct
  //     const isPasswordValid = await bcrypt.compare(password, admin.password);
  //     if (!isPasswordValid) {
  //       return res.status(400).json({ message: "Invalid password" });
  //     }
  //     // Check if user is banned
  //     if (admin.accountStatus === 'Banned') {
  //       return res.status(400).json({ error: true, msg: "Admin is banned" });
  //     }
  //     // Find role by admin
  //     const checkRole = await getSingleRole({ roleId: admin.role });
  //     // Fetch permissions based on role
  //     const permissions = checkRole.permission || [];
  //     // Construct permissions key for Redis caching
  //     const permissionsKey = `permissions:${admin.adminId}`;
  //     // Fetch permissions from Redis
  //     let permissionNames = await getAsync(permissionsKey);
  //     if (!permissionNames) {
  //       // Permission names not found in Redis, fetch from database and cache
  //       permissionNames = await getPermissionNamesByIds(permissions);
  //       await setexAsync(permissionsKey, 3600, JSON.stringify(permissionNames));
  //     } else {
  //       permissionNames = JSON.parse(permissionNames);
  //     }
  //     // Generate X-api-key
  //     const xApiKey = global.common.generateAlphNumricString(12);
  //     // Prepare Payload For token
  //     const tokenPayload = {
  //       adminId: admin.adminId,
  //       isSuperAdmin: admin.isSuperAdmin,
  //       xApiKey: xApiKey,
  //       permissions: permissionNames,
  //     };
  //     // Generate Token
  //     const token = global.auth.generateAuthToken(tokenPayload);
  //     const refreshToken = global.auth.generateRefreshToken(tokenPayload);
  //     // Update Login admin with token
  //     await updateAdminLoginWithToken(
  //       { adminId: admin.adminId }, // updateParams
  //       { // updateData
  //         lastLoginAt: new Date(),
  //         tokenGeneratedAt: new Date(),
  //         xApiKey,
  //         token,
  //         refreshToken,
  //         tokenExpireAt: global.datetime.plusHourDate(global.env.TOKEN_EXPIRY_HOUR),
  //       }
  //     );
  //     // Create activity log for login
  //     const activityData = {
  //       userID: admin.adminId, // Assuming adminId is used as userID
  //       tableName: 'admins',
  //       activityType: 'login',
  //       timestamp: new Date(),
  //       details: {
  //         email: admin.email,
  //         ip: req.ip, // Assuming Express req object is used and IP is obtained from it
  //       }
  //     };
  //     // Stringify the details field if it's an array or an object
  //     if (typeof activityData.details === 'object') {
  //       activityData.details = JSON.stringify(activityData.details);
  //     }
  //     // Call the createActivityLog API in another microservice
  //     const method = 'POST';
  //     const url = process.env.CREATE_LOGS_URL;
  //     const headers = {'Content-Type': 'application/json'};
  //     const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);
  //     if (activityLogApiResponse.error) {
  //       logger.error("Error creating activity log:", activityLogApiResponse); // Log the entire response object
  //       throw new Error(activityLogApiResponse.msg);
  //     }
  //     return res.status(200).json({
  //       error: false,
  //       msg: "Login successfully",
  //       xApiKey: tokenPayload.xApiKey,
  //       token: token,
  //       refreshToken: refreshToken,
  //       permissions: permissionNames,
  //       tokenExpireAt: (process.env.TOKEN_EXPIRY_HOUR), // Convert to seconds
  //     });
  //   } catch (error) {
  //     logger.error(error);
  //     return res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

  adminSingIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await getSingleAdmin({ email });
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: true, message: "Invalid password" });
      }
      if (admin.accountStatus === 'Banned') {
        return res.status(400).json({ error: true, message: "Admin is banned" });
      }

      // Fetch role of the admin
      const checkRole = await getSingleRole({ roleId: admin.role });

      // Fetch permissions based on role
      const permissions = checkRole.permission || [];
      // Construct Redis key for permissions
      const permissionsKey = `permissions:${admin.adminId}`;
      // Fetch permissions from Redis
      let permissionsFromRedis = await getAsync(permissionsKey);
      if (!permissionsFromRedis) {
        permissionsFromRedis = permissions;
        // Cache permissions in Redis
        await setexAsync(permissionsKey, 3600, JSON.stringify(permissionsFromRedis));
      } else {
        permissionsFromRedis = JSON.parse(permissionsFromRedis);}
      const mappedPermissionsFromRedis = {};
      permissionsFromRedis.forEach(permissionId => {
        for (const [key, value] of Object.entries({ ADMIN, PERMISSION, ROLE,EMAIL,NOTIFICATION,SMS,ORDER,COUPON,BACKUP, POST, POST_CATEGORY,POST_TYPES,SETTING,ACTIVITY_LOGS,PAYMENTGATEWAY,
          TRANSACTION,CATEGORY,PRODUCT,DASHBOARD,PRODUCT_REPOART,USER_REPOART,ORDER_REPOART,UPLOAD,USER })) {
          if (Object.values(value).includes(parseInt(permissionId))) {
            if (!mappedPermissionsFromRedis[key]) {
              mappedPermissionsFromRedis[key] = [];
            }
            const permissionKey = Object.keys(value).find(key => value[key] === parseInt(permissionId));
            if (permissionKey) {
              mappedPermissionsFromRedis[key].push(permissionKey);
            }
          }
        }
      });
      const xApiKey = global.common.generateAlphNumricString(12);
      const tokenPayload = {
        adminId: admin.adminId,
        isSuperAdmin: admin.isSuperAdmin,
        xApiKey: xApiKey,
        permissions: mappedPermissionsFromRedis,};
      const token = global.auth.generateAuthToken(tokenPayload);
      const refreshToken = global.auth.generateRefreshToken(tokenPayload);
      await updateAdminLoginWithToken(
        { adminId: admin.adminId }, // updateParams
        { // updateData
          lastLoginAt: new Date(),
          tokenGeneratedAt: new Date(),
          xApiKey,
          token,
          refreshToken,
          tokenExpireAt: global.datetime.plusHourDate(global.env.TOKEN_EXPIRY_HOUR),
        });
      const activityData = {
        userID: admin.adminId, // Assuming adminId is used as userID
        tableName: 'admins',
        activityType: 'login',
        timestamp: new Date(),
        details: {
          email: admin.email,
          ip: req.ip, // Assuming Express req object is used and IP is obtained from it
        }};
      const method = 'POST';
      const url = process.env.CREATE_LOGS_URL;
      const headers = { 'Content-Type': 'application/json' };
      const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);
      if (activityLogApiResponse.error) {
        logger.error("Error creating activity log:", activityLogApiResponse); // Log the entire response object
        throw new Error(activityLogApiResponse.msg);}
      const isSuperAdmin = admin.isSuperAdmin === 'yes';
      const permissionsResponse = isSuperAdmin ? { ADMIN } : mappedPermissionsFromRedis;
      return res.status(200).json({
        error: false,
        message: "Login successfully",
        xApiKey: tokenPayload.xApiKey,
        token: token,
        refreshToken: refreshToken,
        permissions:permissionsResponse,
        tokenExpireAt: process.env.TOKEN_EXPIRY_HOUR,
        adminType: isSuperAdmin ? 'superAdmin' : 'admin'
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ error: true, message: error.message });
    }
  },
};

module.exports = authApi;

