const { getAllUser, getUserwithpagination } = require('../../../../users-service/src/v1/services/users')
const { Op } = require("sequelize");
const { formatDate } = require('../services/dashboard');

const usersReportApi = {

  // get All users By RegisterDate
  getUsersByRegisterDate: async (req, res) => {

    try {
      const { orderBy = "createdAt", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { startDate, endDate } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Parse startDate and endDate into Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Adjust endDate to include the whole day
      endDateObj.setHours(23, 59, 59, 999);

      const whereClause = {
        ...filter,
        [Op.or]: {
          createdAt: { [Op.between]: [startDateObj, endDateObj] },
        },
      };

      // Get Users with pagination and apply filter
      const data = await getUserwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allUsers = await getAllUser(whereClause);
        responseData = { error: false, msg: 'Users fetched successfully', data: { rows: allUsers } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Users fetched successfully',
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }
      // Return users response
      if (responseData.length === 0) {
        return res.status(200).json({ error: false, msg: "No users found between the specified dates", data: { rows: responseData } });
      }
      return res.status(200).json(responseData);

    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // get All users By Status
  getUsersByStatus: async (req, res) => {

    try {
      const { orderBy = "createdAt", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { status } = req.query;

      // Parse search query into where clause
      const whereClause = {
        ...filter,
        userStatus: status,
      };

      // Fetch users from the database based on the status, search, and pagination
      const data = await getUserwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allUsers = await getAllUser(whereClause);
        responseData = { error: false, msg: `Users with status "${status}" fetched successfully`, data: { rows: allUsers } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: `Users with status "${status}" fetched successfully`,
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }
      // Return users response
      if (responseData.length === 0) {
        return res.status(200).json({ error: false, msg:  `No ${status} users found`, data: { rows: responseData } });
      }
      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // get All Register Vs ActiveUsers
  getRegisterVsActiveUsers: async (req, res) => {

    try {
      let { startDate, endDate } = req.query;

      // If start_date is not provided, set it to 15 days ago
      if (!startDate) {
        const currentDate = new Date();
        const startDateObj = new Date(currentDate);
        startDateObj.setDate(startDateObj.getDate() - 14);
        startDate = formatDate(startDateObj);
      }

      // If end_date is not provided, set it to today's date
      if (!endDate) {
        const currentDate = new Date();
        endDate = formatDate(currentDate);
      }

      // Fetch users registered within the specified date range
      const users = await getAllUser({
        createdAt: {
          [Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
        }
      });

      // Initialize an object to store user counts for each date
      const userCounts = {};

      // Iterate over the users to count active and registered users for each date
      users.forEach(user => {
        const dateKey = user.createdAt.split(' ')[0]; // Extract date in "YYYY-MM-DD" format

        if (!userCounts[dateKey]) {
          userCounts[dateKey] = { registeredUsers: 0, activeUsers: 0 };
        }

        userCounts[dateKey].registeredUsers++;

        if (user.userStatus === 'Active') {
          userCounts[dateKey].activeUsers++;
        }
      });

      // Prepare the response data with counts for each date
      const response = Object.entries(userCounts).map(([date, counts]) => ({
        date,
        ...counts
      }));

      res.status(200).json({
        error: false,
        msg: 'User statistics fetched successfully',
        data: { rows: response }
      });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

}

module.exports = usersReportApi;

