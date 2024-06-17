const adminLogin = require("../models/admin");
const role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const permission = require("../models/permission");
const logger = require("../helpers/logger-helper");
const { getSingleAdmin, updateAdminLoginWithToken } = require("../services/admin");
const { getSingleRole } = require('../services/role')

// var authApi = {
//   // Admin Login API
//   adminSingIn: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       // Find admin by email
//       const admin = await adminLogin.findOne({ where: { email: email } });
//       if (!admin) {
//         return res.status(404).json({ message: "Admin not found" });
//       }

//       // Check if the user has a role assigned
//       if (!admin.role) {
//         return res.status(400).json({ error: true, msg: "No role assigned to this Admin" });
//       }

//       // Check if password is correct
//       const isPasswordValid = await bcrypt.compare(password, admin.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid password" });
//       }

//       // Find role by admin
//       const checkRole = await role.findOne({ roleId: admin.role });
//       if (!checkRole) {
//         return res.status(404).json({ message: "Role not found" });
//       }

//       // Fetch permissions based on role
//       const permissions = checkRole.permission || []; // permissions stored as array of IDs

//       // Generate X-api-key
//       const xApiKey = global.common.generateAlphNumricString(12);

//       // Prepar Payload For token
//       const tokenPayload = {
//         adminId: admin.adminId,
//         isSuperAdmin: admin.isSuperAdmin,
//         xApiKey: xApiKey,
//         permissions: permissions,
//       };

//       // Generate Token
//       const token = global.auth.generateAuthToken(tokenPayload);

//       // Update Login admin with token
//       await admin.update(
//         {
//           lastLoginAt: new Date(),
//           tokenGeneratedAt: new Date(),
//           xApiKey,
//           token,
//           tokenExpireAt: global.datetime.plusHourDate(
//             global.env.TOKEN_EXPIRY_HOUR
//           ), // Changed function name to snake_case
//         },
//         { where: { adminId: admin.adminId } }
//       );

//       return res.status(200).json({
//         error: false,
//         msg: "Login successfully",
//         xApiKey: tokenPayload.xApiKey,
//         token: token,
//         expiresIn: parseInt(process.env.TOKEN_EXPIRY_HOUR) * 60 * 60, // this is Convert For milisecond / 3600 = hours
//       });
//     } catch (error) {
//       logger.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   // This is For Create Admin (Token - x-api-key update - Not Needed)
//   // adminSingUp: async (req, res) => {
//   //   try {
//   //     const { email, password, firstName, lastName, mobile, role } = req.body;

//   //     // Check if admin with email already exists
//   //     const existingAdmin = await adminLogin.findOne({
//   //       where: { email: email },
//   //     });
//   //     if (existingAdmin) {
//   //       return res
//   //         .status(400)
//   //         .json({ error: true, msg: "Admin already exists. Please login." });
//   //     }

//   //     // Hash the password
//   //     const salt = await bcrypt.genSalt(10);
//   //     const hashedPassword = await bcrypt.hash(password, salt);

//   //     // Generate 12 character Alpha Numeric
//   //     const xApiKey = global.common.generateAlphNumricString(12); // Assuming this function is defined properly
//   //     logger.info("x_api_key", xApiKey);

//   //     // Create the admin with x_api_key
//   //     const admin = await adminLogin.create({
//   //       email,
//   //       password: hashedPassword,
//   //       firstName,
//   //       lastName,
//   //       mobile,
//   //       role,
//   //     });

//   //     // Generate token payload
//   //     const tokenPayload = {
//   //       adminId: admin.adminId,
//   //       email: admin.email,
//   //       xApiKey: admin.xApiKey,
//   //     };

//   //     // Generate Token
//   //     const token = global.auth.generateAuthToken(tokenPayload); // Assuming this function is defined properly

//   //     // Update admin with token
//   //     await admin.update(
//   //       { lastLoginAt: new Date(), token },
//   //       { where: { adminId: admin.adminId } }
//   //     );

//   //     res.status(200).json({
//   //       error: false,
//   //       msg: "Admin signup successful",
//   //       token,
//   //     });
//   //   } catch (error) {
//   //     res
//   //       .status(400)
//   //       .json({ error: true, msg: "Internal Server Error", er: error });
//   //   }
//   // },
// };

// module.exports = authApi;






var authApi = {
  // Admin Login API
  adminSingIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find admin by email
      const admin = await getSingleAdmin({'email' : email});


      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Find role by admin
      const checkRole = await getSingleRole({'roleId': admin.role});

      // Fetch permissions based on role
      const permissions = checkRole.permission || []; // permissions stored as array of IDs

      // Generate X-api-key
      const xApiKey = global.common.generateAlphNumricString(12);

      // Prepare Payload For token
      const tokenPayload = {
        adminId: admin.adminId,
        isSuperAdmin: admin.isSuperAdmin,
        xApiKey: xApiKey,
        permissions: permissions,
      };

      // Generate Token
      const token = global.auth.generateAuthToken(tokenPayload);

      // Update Login admin with token
      await updateAdminLoginWithToken({'adminId': admin.adminId, xApiKey, token});

      return res.status(200).json({
        error: false,
        msg: "Login successfully",
        xApiKey: tokenPayload.xApiKey,
        token: token,
        expiresIn: parseInt(process.env.TOKEN_EXPIRY_HOUR) * 60 * 60, // this is Convert For milisecond / 3600 = hours
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
};


module.exports = authApi;





