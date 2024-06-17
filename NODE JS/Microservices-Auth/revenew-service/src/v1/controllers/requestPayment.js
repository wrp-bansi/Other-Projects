const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');
const {
  getSingleRequestPayment,
  getAllRequestPayments,
  createRequestPayment,
  updateRequestPayment,
  deleteRequestPayment,
  getRequestPaymentsWithPagination,
} = require('../services/requestPayment');
const WalletHistory = require('../models/walletHistory');

const requestPaymentApi = {

  // Get Request Payments with Pagination
  getAllRequestPaymentsWithPagination: async (req, res) => {
    try {
      const {
        orderBy = 'id', order = 'DESC', search = '', isDownload = false, filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const vendorId = req.user.userId;

      const whereClause = {
        ...filter,
        vendorId: vendorId,
        [Op.or]: {
          message: { [Op.like]: `%${search}%` }, // Change the field according to your search criteria
        },
      };

      // Get request payments with pagination and apply filter
      const data = await getRequestPaymentsWithPagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all request payments without pagination
        const allRecords = await getAllRequestPayments(whereClause);
        responseData = { error: false, msg: 'Show All Request Payments', data: { rows: allRecords } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Request Payments with Pagination',
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

  // Get all Request Payments without Pagination
  getAllRequestPaymentsRecords: async (req, res) => {
    try {
      const vendorId = req.user.userId; // Get the authenticated user's vendorId
      const data = await getAllRequestPayments({ vendorId });
      res.status(200).json({ error: false, msg: 'Show all Request Payments', data: { rows: data } });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Request Payment by ID
  getRequestPaymentById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await getSingleRequestPayment({ id });
      res.status(200).send({ error: false, msg: 'Show Request Payment by ID', data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create Request Payment Record
  createRequestPaymentRecord: async (req, res) => {
    const { amount, message } = req.body;
    const vendorId = req.user.userId;
    const requestPaymentData = { vendorId, amount, message};
    try {
      // Check if the selected amount is less than or equal to the current amount in the wallet history table
      const currentAmount = await WalletHistory.sum('current_amount', { where: { vendorId: vendorId } });
      if (!currentAmount || amount > currentAmount) {
        throw new Error('Selected amount exceeds the current available balance');
      }
      await createRequestPayment(requestPaymentData);
      res.status(200).send({ error: false, msg: 'Request Payment Created successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update Request Payment Record
  updateRequestPaymentRecord: async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const existingRecord = await getSingleRequestPayment({id});
      // Ensure the authenticated user owns the record
      if (existingRecord.vendorId !== req.user.userId) {
        throw new Error('Unauthorized to update this record');
      }
      // Check if the updateData contains the vendorId and if it matches the existing vendorId
      if (updateData.vendorId) {
        throw new Error('Cannot update vendorId');
      }

      // Calculate the difference in the amount
      const currentAmount = await WalletHistory.sum('current_amount', { where: { vendorId: existingRecord.vendorId } });
      const amountDifference = updateData.amount - existingRecord.amount;

      // Check if the updated amount exceeds the available balance
      if (!currentAmount || amountDifference > currentAmount) {
        throw new Error('Updated amount exceeds the current available balance');
      }

      await updateRequestPayment({ id }, updateData);
      res.status(200).send({ error: false, msg: 'Request Payment updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Delete Request Payment Record
  deleteRequestPaymentRecord: async (req, res) => {
    const { id } = req.params;
    try {
      const existingRecord = await getSingleRequestPayment({ id });

      // Ensure the authenticated user owns the record
      if (existingRecord.vendorId !== req.user.userId) {
        throw new Error('Unauthorized to delete this record');
      }

      await deleteRequestPayment({ id });
      res.status(200).send({ error: false, msg: 'Request Payment deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk Delete Request Payment Records
  bulkDeleteRequestPaymentRecords: async (req, res) => {
    const { ids } = req.body;
    try {
      // Ensure the authenticated user owns all the records
      const records = await getAllRequestPayments({ id:ids });
      const unauthorizedRecords = records.filter(record => record.vendorId !== req.user.userId);
      if (unauthorizedRecords.length > 0) {
        throw new Error('Unauthorized to delete some records');
      }
      // Perform bulk delete operation
      await deleteRequestPayment({ id: { [Op.in]: ids } });

      // Return success response
      return res.status(200).json({ error: false, msg: 'Request Payment records deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
};

module.exports = requestPaymentApi;
