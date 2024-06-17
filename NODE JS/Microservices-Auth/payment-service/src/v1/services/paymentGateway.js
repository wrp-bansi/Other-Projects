const PaymentGateway = require("../models/paymentGateway");

//Get All PaymentGateway with pagination
async function getPaymentGatewayspagination(whereParams) {
  const data = await PaymentGateway.findAndCountAll(whereParams);

  // If no PaymentGateway found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All PaymentGateway without pagination
async function getAllPaymentGateways(whereParams) {

  const data = await PaymentGateway.findAll({
    where: whereParams
  });
  return data;
}

//Get One PaymentGateway
async function getOnePaymentGateway(whereParams) {
  const data = await PaymentGateway.findOne({ where: whereParams });
  if (!data) throw new Error("PaymentGateway not found");
  return data;
}

//Create All PaymentGateway
async function createPaymentGateway(paymentGatewayData) {
  const paymentGateway = await PaymentGateway.create(paymentGatewayData);
  if (paymentGateway) {
    return paymentGateway;
  } else {
    throw new Error("PaymentGateway not created");
  }

}

//Update PaymentGateway
async function updatePaymentGateway(updateParams, paymentGatewayData) {

  const existingPaymentGateway = await getOnePaymentGateway(updateParams);
  if (!existingPaymentGateway) {
    throw new Error("PaymentGateway not found");
  }
  await existingPaymentGateway.update(paymentGatewayData);

  return existingPaymentGateway;
}

//Delete PaymentGateway
async function deletePaymentGateway(whereParams) {
  const data = await PaymentGateway.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("PaymentGateway not found");
  }
  return { msg: "PaymentGateway deleted successfully" };
}

module.exports = { getPaymentGatewayspagination, getAllPaymentGateways, getOnePaymentGateway, createPaymentGateway, updatePaymentGateway, deletePaymentGateway };
