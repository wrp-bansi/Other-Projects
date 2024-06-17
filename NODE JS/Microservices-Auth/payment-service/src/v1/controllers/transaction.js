const { getTransactionswithgpagination, getAllTransactions } = require("../services/transaction");
const { Op } = require("sequelize");

const transactionApi = {

  //Get All transaction with pagination
  getAllTransactionwithPagination: async (req, res) => {
    try {
      const { orderBy = "transactionId", order = "DESC", search = "", isDownload = false, filter = {} } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        // Example search condition, adjust as needed
        whereClause = {
          ...whereClause,
          [Op.or]: {
            transactionId: { [Op.like]: `%${search}%` },
            customerId: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Transactions with pagination and apply filter
      const data = await getTransactionswithgpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allTransactions = await getAllTransactions(whereClause);
        responseData = { error: false, msg: "Show All Transactions", data:{rows: allTransactions} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Transactions with Pagination",
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
      console.error("Error occurred while fetching Transactions:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //view transactions
  viewTransactions: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Fetch transactions associated with the logged-in user
      const transactions = await getAllTransactions({ customerId: userId });
      return res.status(200).json({ error: false, msg: "Transactions retrieved successfully", data: transactions });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = transactionApi;
