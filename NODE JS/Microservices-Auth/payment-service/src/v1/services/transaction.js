const Transaction = require("../models/transaction");
require('dotenv').config();

//Get All Transactions with pagination
async function getTransactionswithgpagination(whereParams, otherdata) {
  const data = await Transaction.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no Transactions found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Transactions without pagination
async function getAllTransactions(whereParams) {

  const data = await Transaction.findAll({
    where: whereParams
  });
  return data;
}

//Get One Transaction
async function getOneTransaction(whereParams) {
  const data = await Transaction.findOne({ where: whereParams });
  if (!data) throw new Error("Transaction not found");
  return data;
}

//Create Transaction
async function createTransaction(transactionData) {
  const transaction = await Transaction.create(transactionData);
  if (transaction) {
    return transaction;
  } else {
    throw new Error("Transaction not created");
  }
}

//Update Transaction
const updateTransactionStatus = async (orderId, status,) => {
  try {
    // Retrieve the transaction based on the order ID
    const transaction = await getOneTransaction({ orderId });

    if (!transaction) {
      return;
    }

    // Update the transaction status
    transaction.transactionStatus = status;
    await transaction.save();
  }
  catch (error) {
    console.error('Error updating transaction status:', error);
  }
};

async function UpdateOrderStatus(orderId, { orderStatus, email, username, orderItems }) {
  const method = 'PUT';
  const url =`${process.env.UPDATE_ORDER_STATUS_URL}/${orderId}`;
  const headers = { 'Content-Type': 'application/json' };
  const updateOrderResponse = await global.common.callMicroServiceApi(method, url, { orderStatus,
    email,
    username,
    orderItems}, headers);
  if (updateOrderResponse.error) {
    throw new Error(updateOrderResponse.msg);
  }
}

module.exports = {createTransaction,getOneTransaction,updateTransactionStatus,UpdateOrderStatus,getTransactionswithgpagination,getAllTransactions };
