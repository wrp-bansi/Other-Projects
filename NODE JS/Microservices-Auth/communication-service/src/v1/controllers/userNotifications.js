const { getOneTicket } = require("../services/ticket");
const { getAllUserNotification, getOneUserNotification, createUserNotification, updateuserNotification, deleteUserNotification, getUserNotificationwithpagination, getUserNotificationCount, markAllNotificationsAsRead } = require("../services/userNotifications");
const { Op } = require("sequelize");
const logger = require('../helpers/logger-helper');

const UserNotificationsApi = {

  //Get All User Notification with pagination
  getAllUserNotificationwithpagination: async (req, res) => {
    try {
      const { orderBy = "id", order = "DESC", viewAll = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      let responseData;

      if (viewAll === 'true') {
        // Mark all notifications as read
        await markAllNotificationsAsRead();

        // Retrieve all notifications with pagination
        const allNotification = await getUserNotificationwithpagination({
          offset,
          limit: perPage,
          order: [[orderBy, order]],
        });

        // Get last ticket number
        const lastTicket = await getOneTicket({}, [["id", "DESC"]]);

        // Return only data without pagination count
        responseData = {
          error: false,
          msg: "Show All User Notifications",
          data: {
            rows: allNotification.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(allNotification.count / perPage),
            count: allNotification.count,
            unreadCount: 0,
            lastTicketNo: lastTicket ? lastTicket.id : null
          },
        };
      } else {
        // Retrieve notifications with pagination based on filter criteria
        const data = await getUserNotificationwithpagination({
          offset,
          limit: 5,
          order: [[orderBy, order]],
        });

        // Calculate the count of unread notifications
        const unreadCount = await getUserNotificationCount({ status: 'unread' });
        const allCount = await getUserNotificationCount();

        const lastTicket = await getOneTicket({}, [["id", "DESC"]]);

        // If not downloading, return paginated data with count of unread notifications
        responseData = {
          error: false,
          msg: "Show last 5  user Notification",
          data: {
            rows: data.rows,
            perPage: 5,
            currentPage,
            totalPages: Math.ceil(1),
            count: allCount,
            unreadCount,
            lastTicketNo: lastTicket ? lastTicket.id : null
          },

        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All User Notification without pagination
  getAllUserNotifications: async (req, res) => {
    try {
      // Fetch all User notifications
      const notifications = await getAllUserNotification();

      // Return the User notifications in the response
      return res.status(200).send({ error: false, msg: "User Notification fetched sucessfully", data:{rows: notifications} });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get One User Notification
  getUserNotificationById: async (req, res) => {
    const { userNotificationId } = req.params
    try {
      const userNotification = await getOneUserNotification({ id: userNotificationId });
      res.status(200).json({ error: false, msg: "User Notification found successfully", data: userNotification });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create User Notification
  createUserNotification: async (req, res) => {
    try {
      const { userId, message, image, redirectType, referenceId, status } = req.body;
      const userNotificationData = { userId,
        message,
        image,
        redirectType,
        referenceId,
        status: status || 'unread', };

      // Create user notification
      await createUserNotification(userNotificationData);
      // Return success response
      return res.status(200).send({ error: false, msg: "User Notification created sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message});
    }
  },

  //Update User Notification
  updateUserNotification: async (req, res) => {
    const { userNotificationId } = req.params
    const userNotificationData = req.body;
    try {
      await updateuserNotification({ id: userNotificationId }, userNotificationData);
      res.status(200).json({ error: false, msg: "User Notification updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update User Notification Status
  updateUserNotificationStatus: async (req, res) => {
    try {
      const { userNotificationId } = req.params;

      await updateuserNotification({ id: userNotificationId }, { status:'read' });
      return res.status(200).json({ error: false, msg: 'User Notification status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete User Notification
  deleteUserNotification: async (req, res, next) => {
    try {
      const { userNotificationId } = req.params;

      // Find the User notification by ID and delete it
      await deleteUserNotification({ id: userNotificationId });

      // Return success response
      return res.status(200).send({ error: false, msg: "User Notification deleted sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete User Notification
  bulkDeleteUserNotifications: async (req, res) => {
    try {
      const { userNotificationIds } = req.body;
      // Perform bulk delete operation
      await deleteUserNotification({ id: { [Op.in]: userNotificationIds } });
      // Return success response
      return res.status(200).json({ error: false, msg: "All User Notification deleted sucessfully" });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

}

module.exports = UserNotificationsApi;
