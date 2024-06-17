const { getAllCurrencieswithpagination, getAllCurrencies, getCurrencyById, createCurrency, updateCurrency, deleteCurrency } = require('../services/currency');
const { Op } = require('sequelize');
const logger = require('../helpers/logger-helper');

const currencyController = {
  // Get all currencies with Pagination
  getAllCurrenciesWithPagination: async (req, res) => {
    try {
      const {
        orderBy = 'currencyId',
        order = 'DESC',
        search = '',
        isDownload = false,
        filter = {},
      } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      const whereClause = {
        ...filter,
        [Op.or]: {
          currencyCode: { [Op.like]: `%${search}%` },
          currencyName: { [Op.like]: `%${search}%` },
        },
      };

      // Get currencies with pagination and apply filter
      const data = await getAllCurrencieswithpagination(whereClause, {
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return all currencies without pagination
        const allCurrencies = await getAllCurrencies(whereClause);
        responseData = { error: false, msg: 'Show All Currencies', data: { rows: allCurrencies } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: 'Show All Currencies with Pagination',
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

  // Get all currencies
  getAllCurrencies: async (req, res) => {
    try {
      const currencies = await getAllCurrencies();
      res.status(200).json({ error: false, msg: 'Show all currencies', data: currencies });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get a single currency by ID
  getCurrencyById: async (req, res) => {
    const { currencyId } = req.params;
    try {
      const currency = await getCurrencyById(currencyId);
      if (!currency) {
        throw new Error('Currency not found');
      }
      res.status(200).json({ error: false, msg: 'Show currency by ID', data: currency });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Create a new currency
  createCurrency: async (req, res) => {
    const { currencyCode, currencyName, symbol, country, exchangeRate,decimalPlaces } = req.body;
    const currencyData ={currencyCode, currencyName, symbol, country, exchangeRate,decimalPlaces }
    try {
      await createCurrency(currencyData);
      res.status(200).json({ error: false, msg: 'Currency created successfully'});
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update a currency
  updateCurrency: async (req, res) => {
    const { currencyId } = req.params;
    const updateData = req.body;
    try {
      await updateCurrency(currencyId, updateData);
      res.status(200).json({ error: false, msg: 'Currency updated successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Delete a currency
  deleteCurrency: async (req, res) => {
    const { currencyId } = req.params;
    try {
      await deleteCurrency(currencyId);
      res.status(200).json({ error: false, msg: 'Currency deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Bulk delete currency
  bulkDeleteCurrency: async (req, res) => {
    const { currencyIds } = req.body;
    try {
      // Perform bulk delete operation
      await deleteCurrency(currencyIds);

      // Return success response
      return res.status(200).json({ error: false, msg: 'All Currency deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  },
}


module.exports = currencyController;
