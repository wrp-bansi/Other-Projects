const { getAllifications, getNotificationwithpagination, createNotification, deleteNotification } = require('../services/notification')
const { sequelize } = require('../config/mysql-db');
const { sendNotificationToFirebase } = require('../services/firebase');
const { sendNotificationToOneSignal } = require('../services/oneSignal');
const logger = require('../helpers/logger-helper');
const { Op } = require("sequelize");
const { getSettingValue } = require('../helpers/chche-helper');

const notificationApi = {

  //Create Notification
  createNotification: async (req, res, next) => {
    try {
      const { title, message} = req.body;
      const postData = {
        title,
        message,
        image: req.body.image || '',
      };

      // Create the notification
      await createNotification(postData);

      // Query to get users' tokens
      const usersQuery = `
        SELECT
          d.firebase_token,
          d.is_active
        FROM
          user_devices d
        WHERE
          is_active = 0 AND firebase_token != ''`;

      // Execute the query to get users' tokens
      const usersTokens = await sequelize.query(usersQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      // Extract registration tokens from the query result
      const registrationTokens = usersTokens.map(user => user.firebase_token);

      // Check if there are users with tokens
      if (registrationTokens.length > 0) {
        // Determine notification type based on environment variable
        const notificationType = await getSettingValue('NOTIFICATION_TYPE');

        // Send notification based on notification type
        if (notificationType) {
          await sendNotificationToFirebase(registrationTokens, postData);
        // eslint-disable-next-line no-dupe-else-if
        } else if (notificationType) {
          await sendNotificationToOneSignal(registrationTokens, postData);
        }
      }

      // Return success response
      return res.status(200).send({ error: false, msg: "Notification created sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message});
    }
  },

  //Get All Notification with pagination
  getAllNotificationwithpagination: async (req, res) => {
    try {
      const { orderBy = "notificationId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            title: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Notification with pagination and apply filter
      const data = await getNotificationwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        const allNotification = await getAllifications(whereClause);
        // If downloading, return only data without pagination count
        responseData = { error: false, msg: "Show All Notifications", data:{rows: allNotification} };

      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Notifications with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Notification without pagination
  getNotifications: async (req, res, next) => {
    try {
      // Fetch all notifications
      const notifications = await getAllifications();

      // Return the notifications in the response
      return res.status(200).send({ error: false, msg: "Notification fetched sucessfully", data:{rows: notifications} });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Delete Notification
  deleteNotification: async (req, res, next) => {
    try {
      const { nId } = req.params;

      // Find the notification by ID and delete it
      await deleteNotification({ notificationId: nId });

      // Return success response
      return res.status(200).send({ error: false, msg: "Notification deleted sucessfully" });
    } catch (error) {
      // Handle errors
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Notification
  bulkDeleteNotifications: async (req, res, next) => {
    try {
      const { notificationIds } = req.body;
      // Perform bulk delete operation
      await deleteNotification({ notificationId: { [Op.in]: notificationIds } });

      // Return success response
      return res.status(200).json({ error: false, msg: "All Notification deleted sucessfully" });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

};

module.exports = notificationApi;
