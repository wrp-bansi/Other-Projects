const Currency = require('../models/currency');

// Get all currencies with Pagination
async function getAllCurrencieswithpagination(whereParams, otherdata) {
  const data = await Currency.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no wishList found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get all currencies
async function getAllCurrencies(whereParams) {
  const data = await Currency.findAll({where:whereParams});
  return data;
}

// Get a single currency by ID
async function getCurrencyById(currencyId) {
  const data = await Currency.findByPk(currencyId);
  return data;
}

// Create a new currency
async function createCurrency(currencyData) {
  const currencyCreate = await Currency.create(currencyData);
  if (currencyCreate) {
    return currencyCreate;
  }
  throw new Error('Currency not created');
}

// Update a currency
async function updateCurrency(currencyId, updateData) {
  // Check if the currency exists
  const existingCurrency = await getCurrencyById(currencyId);
  if (!existingCurrency) {
    throw new Error('Currency not found');
  }

  await existingCurrency.update(updateData);
  return existingCurrency;
}

// Delete a currency
async function deleteCurrency(currencyId) {
  const deletedRows = await Currency.destroy({ where: { currencyId } });
  if (deletedRows === 0) {
    throw new Error('Currency not found');
  }
  return { msg: 'Currency deleted successfully' };
}

module.exports = {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getAllCurrencieswithpagination
};
