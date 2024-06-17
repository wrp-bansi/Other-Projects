// const userLogin = require("../models/users");
// const device = require("../models/devices");
// // const otp = require("../models/otps");
// const logger = require("../helpers/logger-helper");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// // const permission = require("../models/permission");

// var authApi = {
//   // User Register
//   userSingUp: async (req, res) => {
//     try {
//       const {
//         firstName,
//         lastName,
//         email,
//         password,
//         mobile,
//         deviceId,
//         deviceName,
//         deviceType,
//         ip,
//         token,
//         firebaseToken,
//       } = req.body;

//       // Check if admin with email already exists
//       const existingUser = await userLogin.findOne({
//         where: { email: email },
//       });
//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ error: true, msg: "User already exists. Please login." });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Create the user with x_api_key
//       const user = await userLogin.create({
//         email,
//         password: hashedPassword,
//         firstName,
//         lastName,
//         mobile,
//         registerAtIp: ip,
//         xApiKey: "", // Add x_api_key here
//         token: "", // Initialize token field
//         emailUpdatedAt: "",
//         passwordUpdatedAt: "",
//         bannedReason: "",
//       });

//       await device.create({
//         userId: user.userId,
//         deviceId,
//         deviceName,
//         deviceType,
//         isActive: 1,
//         firebaseToken,
//       });

//       // Generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//       const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

//       // Update user with OTP
//       await user.update({
//         emailVerificationCode: otp,
//         emailExpiryAt: otpExpiry,
//       });

//       // Prepar Payload For token
//       const tokenPayload = {
//         userId: parseInt(user.userId),
//       };

//       // Generate Token
//       const generateToken = global.auth.generateAuthToken(tokenPayload);

//       res.status(200).json({
//         error: false,
//         msg: "User Register Successfully",
//         token: generateToken,
//       });
//     } catch (error) {
//       logger.error(error);
//       res
//         .status(400)
//         .json({ error: true, msg: "Internal Server Error", er: error });
//     }
//   },

//   // If Token userId Match then User Status Active (0) update
//   userActive: async (req, res) => {
//     try {
//       const { token, emailVerificationCode } = req.body;

//       // Verify token decoded
//       const decodedToken = await global.auth.verifyToken(token); // Await the promise
//       if (!decodedToken) {
//         return res.status(400).json({ error: true, msg: "Invalid token" });
//       }

//       // Chack Token Decoded token UserId So Specific not Define User ID
//       const userId = decodedToken.decoded.userId;

//       // Check if OTP matches
//       const user = await userLogin.findOne({ where: { userId: userId } });

//       if (!user) {
//         return res.status(404).json({ error: true, msg: "User not found" });
//       }

//       // Check if the provided emailVerificationCode matches the stored one
//       if (user.emailVerificationCode !== emailVerificationCode) {
//         return res
//           .status(400)
//           .json({ error: true, msg: "Invalid email verification code" });
//       }

//       // Check if the email verification code has expired
//       if (user.emailExpiryAt < new Date()) {
//         return res
//           .status(400)
//           .json({ error: true, msg: "Email verification code has expired" });
//       }

//       // Update userStatus to 0
//       await user.update({ userStatus: 0 });

//       res.status(200).json({
//         error: false,
//         msg: "User activated successfully",
//       });
//     } catch (error) {
//       logger.error(error);
//       res
//         .status(500)
//         .json({ error: true, msg: "Internal Server Error", er: error });
//     }
//   },

//   // Send Email For Forfot Password
//   forgotPassword: async (req, res) => {
//     const { email } = req.body;
//     try {
//       // Check if user Email exists
//       const user = await userLogin.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ message: "User Email not found" });
//       }

//       // Generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//       const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

//       // Update user with OTP
//       await user.update({
//         emailVerificationCode: otp,
//         emailExpiryAt: otpExpiry,
//       });

//       // Prepar Payload For token
//       const tokenPayload = {
//         email: user.email,
//       };

//       // Generate Token
//       const generateToken = global.auth.generateAuthToken(tokenPayload);
//       res.status(200).json({
//         error: false,
//         msg: "Send Email Verification Code successfully",
//         token: generateToken,
//       });
//     } catch (error) {
//       logger.error(error);
//       res.status(500).json({
//         error: true,
//         msg: "Internal Server Error",
//         er: error,
//       });
//     }
//   },

//   // Token email & Email code Chack Otp Match Or Not And Update Password
//   verifyOtpUpdatePassword: async (req, res) => {
//     try {
//       const { token, emailVerificationCode, password } = req.body;

//       // Verify token decoded
//       const decodedToken = await global.auth.verifyToken(token); // Await the promise
//       if (!decodedToken) {
//         return res.status(400).json({ error: true, msg: "Invalid User token" });
//       }

//       // Chack Token Decoded Userid
//       const emailId = decodedToken.decoded.email;

//       // Check if OTP matches
//       const user = await userLogin.findOne({ where: { email: emailId } });
//       if (!user) {
//         return res
//           .status(404)
//           .json({ error: true, msg: "User Email not found" });
//       }

//       // Check if the provided emailVerificationCode matches the stored one
//       if (user.emailVerificationCode !== emailVerificationCode) {
//         return res
//           .status(400)
//           .json({ error: true, msg: "Invalid email verification code" });
//       }

//       // Check if the email verification code has expired
//       if (user.emailExpiryAt < new Date()) {
//         return res
//           .status(400)
//           .json({ error: true, msg: "Email verification code has expired" });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       await user.update({
//         password: hashedPassword,
//       });

//       res.status(200).json({
//         error: false,
//         msg: "User Password Update Successfully",
//       });
//     } catch (error) {
//       logger.error(error);
//       res.status(500).json({
//         error: true,
//         msg: "Internal Server Error",
//         er: error,
//       });
//     }
//   },

//   // Token Email
//   updatePassword: async (req, res) => {
//     try {
//       const { token, password } = req.body;

//       // Verify token decoded
//       const decodedToken = await global.auth.verifyToken(token); // Await the promise
//       if (!decodedToken) {
//         return res.status(400).json({ error: true, msg: "Invalid token" });
//       }

//       // Chack Token Decoded Userid
//       const emailId = decodedToken.decoded.email;

//       // Check if OTP matches
//       const user = await userLogin.findOne({ where: { email: emailId } });

//       if (!user) {
//         return res.status(404).json({ error: true, msg: "Email not found" });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       await user.update({
//         password: hashedPassword,
//       });

//       res.status(200).json({
//         error: false,
//         msg: "Update Password Successfully",
//       });
//     } catch (error) {
//       logger.error(error);
//       res.status(500).json({
//         error: true,
//         msg: "Internal Server Error",
//         er: error,
//       });
//     }
//   },

//   // User Login
//   userSingIn: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       // Find admin by email
//       const user = await userLogin.findOne({ where: { email: email } });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Check if password is correct
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid password" });
//       }

//       // Generate X-api-key
//       const xApiKey = global.common.generateAlphNumricString(12);

//       // Prepar Payload For token
//       const tokenPayload = {
//         userId: user.userId,
//         xApiKey: xApiKey,
//       };

//       // Generate Token
//       const token = global.auth.generateAuthToken(tokenPayload);

//       // Update Login user with token
//       await user.update(
//         {
//           lastLoginAt: new Date(),
//           tokenGeneratedAt: new Date(),
//           xApiKey,
//           token,
//         },
//         { where: { userId: user.userId } }
//       );

//       return res.status(200).json({
//         error: false,
//         msg: "User Login successfully",
//         xApiKey: tokenPayload.xApiKey,
//         token: token,
//         expiresIn: parseInt(process.env.TOKEN_EXPIRY_HOUR) * 60 * 60, // this is Convert For milisecond / 3600 = hours
//       });
//     } catch (error) {
//       logger.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },
// };

// module.exports = authApi;


const userLogin = require("../models/users");
const device = require("../models/devices");
// const otp = require("../models/otps");
const logger = require("../helpers/logger-helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const permission = require("../models/permission");
const { getSingleUser,createUser,getOneUser,updateUser}=require('../services/users');
const { createDevice } = require("../services/devices");

var authApi = {
  // User Register
  userSingUp: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        mobile,
        deviceId,
        deviceName,
        deviceType,
        ip,
        token,
        firebaseToken,
      } = req.body;

      // Check if admin with email already exists
      await getSingleUser({"email": email });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user with x_api_key
      const user = await createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        mobile,
        registerAtIp: ip,
        xApiKey: "", // Add x_api_key here
        token: "", // Initialize token field
        emailUpdatedAt: "",
        passwordUpdatedAt: "",
        bannedReason: "",
      });

      await createDevice({
        userId: user.userId,
        deviceId,
        deviceName,
        deviceType,
        isActive: 1,
        firebaseToken,
      });

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

      // Update user with OTP
      await updateUser({ email }, {
        emailVerificationCode: otp,
        emailExpiryAt: otpExpiry,
      });

      // Prepar Payload For token
      const tokenPayload = {
        userId: parseInt(user.userId),
      };

      // Generate Token
      const generateToken = global.auth.generateAuthToken(tokenPayload);

      res.status(200).json({
        error: false,
        msg: "User Register Successfully",
        token: generateToken,
      });
    } catch (error) {
      logger.error(error);
      res
        .status(400)
        .json({ error: true, msg: error.message });
    }
  },

  // If Token userId Match then User Status Active (0) update
  userActive: async (req, res) => {
    try {
      const { token, emailVerificationCode } = req.body;

      // Verify token decoded
      const decodedToken = await global.auth.verifyToken(token); // Await the promise
      if (!decodedToken) {
        return res.status(400).json({ error: true, msg: "Invalid token" });
      }

      // Chack Token Decoded token UserId So Specific not Define User ID
      const userId = decodedToken.decoded.userId;

      // Check if OTP matches
      const user = await getOneUser({ userId: userId });



      // Check if the provided emailVerificationCode matches the stored one
      if (user.emailVerificationCode !== emailVerificationCode) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid email verification code" });
      }

      // Check if the email verification code has expired
      if (user.emailExpiryAt < new Date()) {
        return res
          .status(400)
          .json({ error: true, msg: "Email verification code has expired" });
      }

      // Update userStatus to 0
      await updateUser({ userStatus: 0 });

      res.status(200).json({
        error: false,
        msg: "User activated successfully",
      });
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json({ error: true, msg: error.message  });
    }
  },

  // Send Email For Forfot Password
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      // Check if user Email exists
      const user = await getOneUser({ userId: userId });

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

      // Update user with OTP
      await updateUser({
        emailVerificationCode: otp,
        emailExpiryAt: otpExpiry,
      });

      // Prepar Payload For token
      const tokenPayload = {
        email: user.email,
      };

      // Generate Token
      const generateToken = global.auth.generateAuthToken(tokenPayload);
      res.status(200).json({
        error: false,
        msg: "Send Email Verification Code successfully",
        token: generateToken,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        error: true, msg: error.message
      });
    }
  },

  // Token email & Email code Chack Otp Match Or Not And Update Password
  verifyOtpUpdatePassword: async (req, res) => {
    try {
      const { token, emailVerificationCode, password } = req.body;
      console.log(req.body)

      // Verify token decoded
      const decodedToken = await global.auth.verifyToken(token); // Await the promise
      if (!decodedToken) {
        return res.status(400).json({ error: true, msg: "Invalid User token" });
      }

      // Chack Token Decoded Userid
      const user = await getOneUser({ email: emailId });


      // Check if the provided emailVerificationCode matches the stored one
      if (user.emailVerificationCode !== emailVerificationCode) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid email verification code" });
      }

      // Check if the email verification code has expired
      if (user.emailExpiryAt < new Date()) {
        return res
          .status(400)
          .json({ error: true, msg: "Email verification code has expired" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await updateUser({ email: emailId }, { password: hashedPassword });

      res.status(200).json({
        error: false,
        msg: "User Password Update Successfully",
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        error: true,
        msg: error.message,

      });
    }
  },

  // Token Email
  updatePassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      // Verify token decoded
      const decodedToken = await global.auth.verifyToken(token); // Await the promise
      if (!decodedToken) {
        return res.status(400).json({ error: true, msg: "Invalid token" });
      }

      // Chack Token Decoded Userid
      const emailId = decodedToken.decoded.email;

      // Check if OTP matches
      const user = await getOneUser({ email: emailId });



      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await updateUser({ email: emailId }, { password: hashedPassword });

      res.status(200).json({
        error: false,
        msg: "Update Password Successfully",
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        error: true,
        msg: error.message,
      });
    }
  },

  // User Login
  userSingIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Request body:", req.body);

      // Find admin by email
      const user = await getOneUser({ email: email });


      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate X-api-key
      const xApiKey = global.common.generateAlphNumricString(12);

      // Prepar Payload For token
      const tokenPayload = {
        userId: user.userId,
        xApiKey: xApiKey,
      };

      // Generate Token
      const token = global.auth.generateAuthToken(tokenPayload);

      // Update Login user with token
      await updateUser({ userId: user.userId }, {
        lastLoginAt: new Date(),
        tokenGeneratedAt: new Date(),
        xApiKey,
        token,
    });

      return res.status(200).json({
        error: false,
        msg: "User Login successfully",
        xApiKey: tokenPayload.xApiKey,
        token: token,
        expiresIn: parseInt(process.env.TOKEN_EXPIRY_HOUR) * 60 * 60, // this is Convert For milisecond / 3600 = hours
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: true,message: error.message });
    }
  },
};

module.exports = authApi;

