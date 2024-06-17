const { getProductPrice } = require('../../../../product-service/src/v1/services/products');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const { getOneCoupon } = require('./coupon');

async function getAllOrderItems(whereParams) {
  return await OrderItem.findAll({
    ...whereParams,
  });
}

//Get All OrderItem
const getOrderItems = async ({ orderId }) => {
  try {
    // Assuming you have a model named OrderItem and it has a method to fetch items by orderId
    const orderItems = await OrderItem.findAll({ where: { orderId } });
    return orderItems;
  } catch (error) {
    throw new Error(`Error fetching order items: ${error.message}`);
  }
};

//Create OrderItem
async function createOrderItem(orderItemData) {
  const orderitems = await OrderItem.create(orderItemData);
  if (orderitems) {
    return orderitems;
  } else {
    throw new Error("Order items not created");
  }

}

//Get One OrderItem
async function getOneOrderItem(whereParams) {
  const data = await OrderItem.findOne({ where: whereParams });
  return data;
}

//Update OrderItem
async function updateOrderItem(updateParams, orderData) {
  try {
    // Check if the order item exists
    const existingOrderItem = await getOneOrderItem(updateParams);
    if (!existingOrderItem) {
      throw new Error(`Order items with parameters ${JSON.stringify(updateParams)} not found`);
    }
    await existingOrderItem.update(orderData);

    return existingOrderItem;
  } catch (error) {
    // Handle the error when the order item is not found
    throw new Error(`Error updating order item: ${error.message}`);
  }

}

//Delete OrderItem
async function deleteOrderItems(whereParams, options) {
  try {
    const data = await OrderItem.destroy({ where: whereParams, ...options });
    if (data === 0) {
      throw new Error("Order items not found");
    }
    return { msg: "Order items deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting order items: ${error.message}`);
  }
}

// Function to calculate total amount based on order items
const calculateOrderAmount = async (orderItems, couponCode) => {
  // Calculate total amount without any discount
  let totalAmount = await Promise.all(orderItems.map(async (item) => {
    const productPrice = await getProductPrice(item.productId);
    return item.quantity * productPrice;
  })).then(subtotals => subtotals.reduce((total, subtotal) => total + subtotal, 0));

  let discountAmount = 0;
  // Check if coupon code is provided
  if (couponCode) {
    // Check if the coupon is available and not expired
    const coupon = await getOneCoupon({ couponCode: couponCode });
    if (!coupon) throw new Error("Coupon not found");
    if (coupon) {
      // Check coupon expiry
      if (coupon.expiryDate < new Date()) {
        throw new Error(`Coupon "${couponCode}" has expired.`);
      }else if(coupon.isActive===false){
        throw new Error(`Coupon has expired.`);
      }
      // Apply discount based on coupon type
      if (coupon.discountType === 'Percentage') {
        discountAmount = (totalAmount * coupon.discountAmount) / 100;
      } else if (coupon.discountType === 'Fixed') {
        discountAmount = coupon.discountAmount;
      }
      // Deduct discount from total amount
      totalAmount -= discountAmount;
      // Ensure order amount doesn't go below 1
      if (totalAmount < 1) {
        totalAmount = 1;
      }
    } else {
      throw new Error(`Coupon "${couponCode}" is not valid.`);
    }
  }

  return { totalAmount, discountAmount };
};

async function checkIfUserOrderedProduct(userId, productId) {
  try {
    const orderItems = await OrderItem.findAll({
      where: { productId },
      attributes: ['orderId']
    });

    if (!orderItems || orderItems.length === 0) {
      return false; // No orders found with the specified product
    }

    const orderIds = orderItems.map(item => item.orderId);

    // Step 2: Check if any of these orders belong to the user and have a completed status
    const orders = await Order.findAll({
      where: {
        orderId: orderIds,
        customerId: userId,
        orderStatus: ['Shipped', 'Delivered']
      }
    });

    return orders.length > 0;
  } catch (error) {
    throw new Error("Error checking if user ordered product.");
  }
}

module.exports = { createOrderItem, deleteOrderItems, getOrderItems, updateOrderItem, getOneOrderItem,calculateOrderAmount,checkIfUserOrderedProduct,getAllOrderItems };
