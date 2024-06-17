
const logger = require("../helpers/logger-helper");
const {getOneUser, updateUser, getUserwithpagination, getAllUser, deleteUser, getSingleUser, createUser} = require('../services/users');
const {createDevice} = require('../services/devices')
const {Op} = require("sequelize");
const ExcelJS = require('exceljs');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const { createVendorCompanyDetails, updateVendorCompanyDetails, getSingleVendorCompanyDetails } = require("../services/VendorCompanyDetails");
const { getOneEmailTemplate } = require("../../../../communication-service/src/v1/services/emailTemplate");


const usersApi = {

  // User register
  userSingUp: async (req, res) => {
    try {
      const {firstName,lastName,email,password,mobile,deviceId,deviceName,deviceType,ip,firebaseToken,role,companyName,companyAddress,companyEmail,companyPhoneNumber,companyLogo} = req.body;

      // Check if user with email already exists
      await getSingleUser({email:email});

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const defaultStatus = role === 'vendor' ? 'Unverified' : 'Active';
      if (role === 'vendor') {
        if (!companyName || !companyAddress || !companyEmail || !companyPhoneNumber) {
          throw new Error("Company details are required for vendor registration");
        }
      }
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
        roleId: role === 'vendor' ? 1 : 2,
        userStatus: defaultStatus,
      });
      let vendorToken = '';
      if (role === 'vendor') {
        // Generate a verification token for the vendor
        vendorToken = crypto.randomBytes(32).toString('hex');

        await createVendorCompanyDetails({ userId: user.userId, companyName, companyAddress, companyEmail, companyPhoneNumber, companyLogo });

        await updateUser({ userId: user.userId }, { token: vendorToken });

        // Send email to the vendor with the verification link
        const emailTemplate = await getOneEmailTemplate({
          slug: 'vendor-registration-verification'
        });

        if (!emailTemplate) {
          throw new Error("Email Template not found");
        }

        // Replace placeholders in the email template
        let replacedTemplate = emailTemplate.bodyHtml.replace(/{Vendor Name}/g, `${firstName} ${lastName}`);
        replacedTemplate = replacedTemplate.replace(/{VERIFY_ACCOUNT_URL}/g, `${process.env.VERIFY_ACCOUNT_URL}/${user.userId}?token=${vendorToken}`);

        // Send email to the vendor
        const emailApiResponse = await global.common.callMicroServiceApi('POST', process.env.SEND_EMAIL_URL, {
          templateName: 'vendor-registration-verification',
          fromEmail: process.env.EMAIL_ADMIN,
          toEmail: user.email,
          emailBody: replacedTemplate
        }, { 'Content-Type': 'application/json' });

        if (emailApiResponse.error) {
          throw new Error('Error from send email:', emailApiResponse.msg);
        }
      }

      await createDevice({userId: user.userId,deviceId,deviceName,deviceType,isActive: 1,firebaseToken,});

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

      await updateUser({email}, {
        emailVerificationCode: otp,
        emailExpiryAt: otpExpiry,
      });

      const notificationData = {
        userId: user.userId,
        message: 'Welcome! Your registration was successful.',
        redirectType: "users",
        status: 'unread',
        referenceId: user.userId,
      };
      const notificationApiResponse = await global.common.callMicroServiceApi('POST', process.env.CREATE_NOTIFICATION_URL, notificationData, { 'Content-Type': 'application/json' });
      if (notificationApiResponse.error) {
        throw new Error(notificationApiResponse.msg);
      }

      res.status(200).json({error: false,msg: "User Register Successfully",vendorToken});
    } catch (error) {
      logger.error(error);
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Get All Users With Pagination
  getAllUserwithpagination: async (req, res) => {
    try {
      const {orderBy = "userId", order = "DESC", search = "", filter = {}, isDownload = false} = req.query;
      const {offset, perPage, currentPage} = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = {...filter};
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            firstName: {[Op.like]: `%${search}%`},
            lastName: {[Op.like]: `%${search}%`},
            userStatus: {[Op.like]: `%${search}%`},
          },
        };
      }

      // Define fields to be selected
      const fieldsToSelect = ['userId', 'firstName', 'lastName', 'email', 'userStatus', 'bannedReason'];

      // Get Users with pagination and apply filter
      const data = await getUserwithpagination({
        attributes: fieldsToSelect,
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allUsers = await getAllUser(whereClause);
        responseData = {error: false, msg: "Show All Users", data:{rows: allUsers}};
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Users with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage),
          }
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({error: true, msg: error.message});
    }
  },

  // Get One User
  getUserById: async (req, res) => {
    const {userId} = req.params;
    try {
      const data = await getOneUser({userId: userId});
      res.status(200).send({error: false, msg: "Show User by id", data});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

  // Get All Users Without Pagination
  getAllUsers: async (req, res) => {
    try {
      const data = await getAllUser();
      res.status(200).json({error: false, msg: "Show all User", data:{rows:data}});
    } catch (error) {
      logger.error(error);
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Update a user
  updateUser: async (req, res) => {

    const { userId } = req.params;
    const updateData = req.body;

    try {

      // Check if a new password is provided
      if (updateData.password) {
        // Hash the new password using bcrypt
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);

        // Create activity log for password update
        const activityData = {
          userID: userId, // Assuming userId is used as userID
          tableName: 'users',
          activityType: 'update_password',
          timestamp: new Date(),
          details: {
            // Add any relevant details you want to log
          }
        };

        // Call the createActivityLog API in another microservice
        const method = 'POST';
        const url = process.env.CREATE_LOGS_URL;
        const headers = { 'Content-Type': 'application/json' }

        const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);

        if (activityLogApiResponse.error) {
          throw new Error(activityLogApiResponse.msg);
        }
      }

      // Perform the update
      await updateUser({ userId: userId }, updateData);
      res.status(200).send({ error: false, msg: "User updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    const {userId} = req.params;
    try {
      await deleteUser({userId: userId});
      // Create notification
      const notificationData = {
        userId: userId,
        message: 'Your account has been deleted.',
        redirectType: "users",
        status: 'unread',
        referenceId: userId,
      };
      const method = 'POST';
      const notificationurl = process.env.CREATE_NOTIFICATION_URL;
      const headers = { 'Content-Type': 'application/json' };
      const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);

      if (notificationApiResponse.error) {
        throw new Error(notificationApiResponse.msg);
      }
      res.status(200).send({error: false, msg: "User deleted successfully"});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

  //Download Xls file
  downloadUsersAsXLS: async (req, res) => {
    try {
      // Retrieve user data from the database
      const users = await getAllUser();

      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');

      // Define columns
      worksheet.columns = [
        {header: 'User ID', key: 'userId', width: 10},
        {header: 'First Name', key: 'firstName', width: 20},
        {header: 'Last Name', key: 'lastName', width: 20},
        {header: 'Email', key: 'email', width: 30}
      ];

      // Add rows
      users.forEach(user => {
        worksheet.addRow({
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      });

      // Set response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

      // Write workbook to response
      await workbook.xlsx.write(res);

      // End response
      res.end();
    } catch (error) {
      console.error(error);
      res.status(400).send({error: true, msg: 'Failed to download users as XLS'});
    }
  },

  // Update a userStatus
  updateStatus: async (req, res) => {
    try {
      const {userId} = req.params;
      const {userStatus, bannedReason,token} = req.body;

      // If status is set to 'Banned', require banned reason
      if (userStatus === 'Banned' && !bannedReason) {
        return res.status(400).json({error: true, msg: 'Banned reason is required'});
      }
      const user = await getOneUser({ userId });

      if (user.roleId === 1) {
        // Check if the provided token matches the stored token
        if (token !== user.token) {
          return res.status(400).json({ error: true, msg: 'Invalid token' });
        }
      }

      // Update user status and banned reason in the database
      await updateUser({userId: userId}, {userStatus, bannedReason,token: ''});
      return res.status(200).json({error: false, msg: 'User status updated successfully'});
    } catch (error) {
      console.error(error);
      return res.status(400).json({error: true, msg: error.message});
    }
  },

  // Bulk-Delete users
  bulkDeleteUsers: async (req, res) => {
    try {
      const {userIds} = req.body;

      // Perform bulk delete operation using Op.in operator
      await deleteUser({userId: {[Op.in]: userIds}});

      const notifications = userIds.map(userId => ({
        userId: userId,
        message: 'Your account has been deleted.',
        redirectType: "users",
        status: 'unread',
        referenceId: userId,
      }));
      // Create notifications and activity logs for each user
      const method = 'POST';
      const notificationurl = process.env.CREATE_NOTIFICATION_URL;
      const headers = { 'Content-Type': 'application/json' };
      const notificationPromises = notifications.map(notificationData =>
        global.common.callMicroServiceApi(method, notificationurl, notificationData, headers)
      );
      const notificationResponses = await Promise.all(notificationPromises);

      notificationResponses.forEach(response => {
        if (response.error) {
          throw new Error(response.msg);
        }
      });

      // Return success response
      return res.status(200).json({error: false, msg: "Users deleted successfully"});
    } catch (error) {
      return res.status(400).json({error: true, msg: error.message});
    }
  },

  // Update profile by users
  updateUserProfile: async (req, res) => {

    const userId = req.user.userId;
    const updateData = req.body;


    try {
      if (updateData.email) {
        throw new Error("Email update not allowed");
      }

      // Check if a new password is provided
      if (updateData.password) {
        // Hash the new password using bcrypt
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);

        // Create activity log for password update
        const activityData = {
          userID: userId, // Assuming userId is used as userID
          tableName: 'users',
          activityType: 'update_password',
          timestamp: new Date(),
          details: {
          }
        };

        // Call the createActivityLog API in another microservice
        const method = 'POST';
        const url = process.env.CREATE_LOGS_URL;
        const headers = { 'Content-Type': 'application/json' }

        const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);

        if (activityLogApiResponse.error) {
          throw new Error(activityLogApiResponse.msg);
        }
      }

      // Check if the user is a vendor and updating company details
      if (req.user.role === 1) {
        if (updateData.companyEmail) {
          throw new Error("Company Email update not allowed");
        }
        if (updateData.companyName || updateData.companyAddress || updateData.companyPhoneNumber || updateData.companyLogo) {
          // Call the function to update vendor company details
          await updateVendorCompanyDetails({ userId: userId }, updateData);
        }
      }

      // Perform the update
      await updateUser({ userId: userId }, updateData);
      res.status(200).send({ error: false, msg: "User updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // view user profile
  viewUserProfile: async (req, res) => {
    const userId = req.user.userId;
    try {
      const user = await getOneUser({userId: userId});
      let companyDetails = null;

      if (user.roleId === 1) { // Assuming roleId 1 corresponds to vendor
        companyDetails = await getSingleVendorCompanyDetails({ userId: userId });
      }
      // Remove vendorCommission field from companyDetails if it exists
      if (companyDetails && 'vendorCommission' in companyDetails) {
        delete companyDetails.vendorCommission;
      }
      res.status(200).send({error: false, msg: "Show User profile", data:{user,companyDetails}});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

};

module.exports = usersApi;

