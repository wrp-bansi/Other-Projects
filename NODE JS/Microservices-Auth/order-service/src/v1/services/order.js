const Order = require('../models/order');
const OrderItem = require('../models/orderItem');


//Get All Orders with pagination
async function getOrderwithpagination(whereParams,otherdata) {
  const data = await Order.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no order found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

async function getAllOrders(whereParams) {
  return await Order.findAll({
    ...whereParams,
  });
}

//Create Order
async function createOrder(OrderData) {

  const order = await Order.create(OrderData);
  if (order) {
    return order;
  } else {
    throw new Error("Order not created");
  }

}

//Get One Order
async function getOneOrder(whereParams) {
  const order = await Order.findOne({ where: whereParams, include: [{ model: OrderItem }] });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
}

//Update Order
async function updateOrder(updateParams, orderData) {
  // Check if the category exists
  const existingOrder = await getOneOrder(updateParams);
  if (!existingOrder) {
    throw new Error("Order not found");
  }

  // Category exists, proceed with the update
  await existingOrder.update(orderData);

  // Return the updated category
  return existingOrder;
}

//Delete Order
async function deleteOrder(whereParams) {
  const data = await Order.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Order not found");
  }
  return { message: "Order deleted successfully" };
}

// Count Order
async function countOrders(whereParams) {
  return await Order.count({where: whereParams});
}

module.exports = { getOrderwithpagination, createOrder, updateOrder, getOneOrder, deleteOrder,countOrders,getAllOrders };

