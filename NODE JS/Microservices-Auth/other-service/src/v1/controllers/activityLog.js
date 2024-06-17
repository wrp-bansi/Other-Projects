
const logger = require("../helpers/logger-helper");
const { getActivityLogswithgpagination,getAllActivityLogs,getOneActivityLog,createActivityLog,deleteActivityLog } = require("../services/activityLog");
const { Op } = require("sequelize");

const settingsApi = {

  //Get All Activity Log with pagination
  getAllActivityLogswithPagination: async (req, res) => {
    try {
      const { orderBy = "logId", order = "DESC", search = "", isDownload = false, filter = {} } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            tableName: { [Op.like]: `%${search}%` },
            activityType: { [Op.like]: `%${search}%` },
            details: { [Op.like]: `%${search}%` }
          },
        };
      }

      // Get All Activity Log with pagination and apply filter
      const data = await getActivityLogswithgpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allActivityLogs = await getAllActivityLogs(whereClause);
        responseData = { error: false, msg: "Show All Activity Logs", data: {rows:allActivityLogs} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Activity Logs with Pagination",
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
      console.error("Error occurred while fetching Activity Logs:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All All Activity Logs without pagination
  getAllActivityLogs: async (req, res) => {
    try {
      const data = await getAllActivityLogs();
      res.status(200).json({ error: false, msg: "All Activity Logs retrieved successfully", data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One All Activity Log
  getActivityLogById: async (req, res) => {
    const { logId } = req.params;
    try {
      const data = await getOneActivityLog({ logId: logId });
      res.status(200).send({ error: false, msg: "Show All Activity Log by id", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Create Activity Log
  createActivityLog: async (req, res) => {
    const { userID, tableName, activityType, timestamp, details } = req.body;
    const activityData = { userID, tableName, activityType, timestamp, details };
    try {
      await createActivityLog(activityData)
      res.status(200).send({ error: false, msg: "Activity Log created successfully'" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Delete Activity Log
  deleteActivityLog: async (req, res) => {
    const { logId } = req.params;
    try {
      await deleteActivityLog({ logId: logId });
      res.status(200).send({ error: false, msg: "Activity Log deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //bulk-Delete Activity Log
  bulkDeleteActivityLogs: async (req, res) => {
    const { logIds } = req.body; // Assuming an array of log IDs is sent in the request body
    try {
      // Perform bulk delete
      await deleteActivityLog({ logId: { [Op.in]: logIds } });
      res.status(200).json({ error: false, msg: "Activity Logs deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = settingsApi;

