const RequestPayment = require('../models/requestPayment');

// Get request payments with pagination
async function getRequestPaymentsWithPagination(whereParams, otherdata) {
  const data = await RequestPayment.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no request payments found, return an empty array
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get all request payments
async function getAllRequestPayments(whereParams) {
  const data = await RequestPayment.findAll({where: whereParams});

  return data;
}

// Get one request payment by ID
async function getSingleRequestPayment(whereParams) {
  const data = await RequestPayment.findOne({ where: whereParams });
  if (!data) {
    throw new Error('Request payment not found');
  }
  return data;
}

// Create a new request payment
async function createRequestPayment(requestPaymentData) {
  const newRequestPayment = await RequestPayment.create(requestPaymentData);
  if (newRequestPayment) {
    return newRequestPayment;
  }
  throw new Error('Failed to create request payment');
}

// Update a request payment
async function updateRequestPayment(updateParams, updateData) {
  const existingRequestPayment = await getSingleRequestPayment(updateParams);
  if (!existingRequestPayment) {
    throw new Error('Request payment not found');
  }

  await existingRequestPayment.update(updateData);
  return existingRequestPayment;
}

// Delete a request payment
async function deleteRequestPayment(deleteParams) {
  const deletedRows = await RequestPayment.destroy({ where: deleteParams });
  if (deletedRows === 0) {
    throw new Error('Request payment not found');
  }
  return { msg: 'Request payment deleted successfully' };
}

module.exports = {
  getSingleRequestPayment,
  getAllRequestPayments,
  createRequestPayment,
  updateRequestPayment,
  deleteRequestPayment,
  getRequestPaymentsWithPagination,
};
