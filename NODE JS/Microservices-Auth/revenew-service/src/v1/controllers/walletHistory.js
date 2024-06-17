const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {
  getSingleWalletHistory,
  getAllWalletHistory,
  createWalletHistory,
  deleteWalletHistory,
  getWalletHistoryWithPagination,
} = require('../services/walletHistory');

const walletHistoryApi = {

  // Get Wallet History with Pagination
  getAllWalletHistoryWithPagination: async (req, res) => {
    try {
      const {
        orderBy = 'id', order = 'DESC', search = '', isDownload = false, filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const userId = req.user.userId;

      const whereClause = {
        ...filter,
        vendorId: userId,
        [Op.or]: {
          vendorId: { [Op.like]: `%${search}%` }
        },

      };

      // Get wallet history with pagination and apply filter
      const data = await getWalletHistoryWithPagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all wallet history without pagination
        const allRecords = await getAllWalletHistory(whereClause);
        responseData = { error: false, msg: 'Show All Wallet History', data: { rows: allRecords } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Wallet History with Pagination',
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage),
          },
        };
      }

      return res.status(200).json(responseData);
    } catch (error) {
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get all Wallet History without Pagination
  getAllWalletHistoryRecords: async (req, res) => {
    try {
      const data = await getAllWalletHistory();
      res.status(200).json({ error: false, msg: 'Show all Wallet History', data: { rows: data } });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Wallet History Record by ID
  getWalletHistoryById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getSingleWalletHistory({id:id});
      if(!data){
        throw new Error('Wallet History not found');
      }
      res.status(200).send({ error: false, msg: 'Show Wallet History by ID', data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create Wallet History Record
  createWalletHistoryRecord: async (req, res) => {
    const { vendorId, amount, orderId, type, previousAmount, currentAmount } = req.body;

    try {
      // If the record doesn't exist, create a new one
      await createWalletHistory({ vendorId, amount, orderId, type, previousAmount, currentAmount });
      res.status(200).send({ error: false, msg: 'Wallet History Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Delete Wallet History Record
  deleteWalletHistoryRecord: async (req, res) => {
    const { id } = req.params;
    try {
      await deleteWalletHistory({ id });
      res.status(200).send({ error: false, msg: 'Wallet History deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk Delete Wallet History Records
  bulkDeleteWalletHistoryRecords: async (req, res) => {
    const { ids } = req.body;
    try {

      // Perform bulk delete operation
      await deleteWalletHistory({ id: { [Op.in]: ids } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Wallet History records deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
};

module.exports = walletHistoryApi;
