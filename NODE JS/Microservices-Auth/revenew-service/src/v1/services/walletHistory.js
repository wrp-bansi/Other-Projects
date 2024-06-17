const WalletHistory = require('../models/walletHistory');

// Get wallet history with pagination
async function getWalletHistoryWithPagination(whereParams, otherdata) {
  const data = await WalletHistory.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no wallet history records found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get all wallet history records
async function getAllWalletHistory(whereParams) {
  const data = await WalletHistory.findAll({ where: whereParams,});

  return data;
}

async function getSingleWalletHistory(whereParams) {
  const data = await WalletHistory.findOne({
    where: whereParams,
    order: [['createdAt', 'DESC']]
  });
  return data;
}

// Create a new wallet history record
async function createWalletHistory(walletHistoryData) {
  const newWalletHistory = await WalletHistory.create(walletHistoryData);
  if (newWalletHistory) {
    return newWalletHistory;
  }
  throw new Error('Failed to create wallet history');
}

// Update a wallet history record
async function updateWalletHistory(vendorId, updateData) {
  try {
    // Get the existing wallet history record
    const existingWalletHistory = await getSingleWalletHistory({ vendorId });

    if (existingWalletHistory) {
      // If the record exists, update it
      await existingWalletHistory.update(updateData);
      return existingWalletHistory;
    } else {
      // If the record doesn't exist, log an error or handle the case accordingly
      console.error(`No wallet history record found for vendorId: ${vendorId}`);
      // You may choose to throw an error, return null, or handle this case differently
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error('Error updating wallet history:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

// Delete a wallet history record
async function deleteWalletHistory(deleteParams) {
  await WalletHistory.destroy({ where: deleteParams });
  return { msg: 'Wallet history deleted successfully' };
}

module.exports = {
  getSingleWalletHistory,
  getAllWalletHistory,
  createWalletHistory,
  updateWalletHistory,
  deleteWalletHistory,
  getWalletHistoryWithPagination,
};
