/* eslint-disable max-lines-per-function */
const { getOrderwithpagination, createOrder, updateOrder, getOneOrder, deleteOrder, getAllOrders } = require('../services/order')
const { Op } = require('sequelize');
const { createOrderItem, deleteOrderItems, getOrderItems, calculateOrderAmount, getAllOrderItems, } = require('../services/orderItem')
const { getProductPrice, updateProductQuantity, getOneProduct } = require('../../../../product-service/src/v1/services/products');
const { sequelize } = require('../config/mysql-db');
const OrderItem = require('../models/orderItem');
const { getOneEmailTemplate } = require('../../../../communication-service/src/v1/services/emailTemplate');
const { getOneUser } = require('../../../../users-service/src/v1/services/users');
const { getAllProducts } = require('../../../../product-service/src/v1/services/products');
const Order = require('../models/order');
const { getSettingValue } = require('../helpers/chche-helper');
const { getSingleWalletHistory } = require('../../../../revenew-service/src/v1/services/walletHistory');
const { getSingleVendorCompanyDetails } = require('../../../../users-service/src/v1/services/VendorCompanyDetails');
const Product = require('../../../../product-service/src/v1/models/product');


const orderApi = {

  //view order
  viewOrders: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Fetch orders associated with the logged-in user
      const orders = await getAllOrders({
        where: { customerId: userId },
        include: [{
          model: OrderItem
        }]
      });
      for (const order of orders) {
        for (const item of order.OrderItems) {
          const product = await await getOneProduct({ productId: item.productId }, {
            attributes: ['productName', 'productImage']
          });
          item.dataValues.Product = product; // Assign product details to the item
        }
      }

      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: true, msg: 'No orders found for this user' });
      }

      return res.status(200).json({
        error: false,
        msg: 'Orders retrieved successfully',
        data: { rows: orders }
      });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }

  },

  // View All Orders with pagination
  listOrdersOfVendor: async (req, res) => {
    try {
      const { orderBy = "orderId", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { orderStatus, startDate, endDate } = req.query;

      const ownerId = req.user.userId;

      const whereClause = { ...filter };

      // Conditionally add date filter if startDate and endDate are provided
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.orderDate = { [Op.between]: [startDateObj, endDateObj] };
      }

      // Conditionally add order status filter if provided
      if (orderStatus) {
        whereClause.orderStatus = orderStatus;
      }

      // Fetch all products with the same ownerId
      const products = await getAllProducts({ where: { ownerId: ownerId } });

      // Extract product IDs
      const productIds = products.map(product => product.productId);

      // Fetch orders with matching product IDs
      let orders;
      if (isDownload === 'true') {
        // If downloading, return orders without pagination
        orders = await Order.findAll({
          include: [
            {
              model: OrderItem,
              where: { productId: productIds }
            }
          ],
          order: [[orderBy, order]]
        });
        // Enhance orders with product details
        for (const order of orders) {
          for (const item of order.OrderItems) {
            const product = await getOneProduct({ productId: item.productId }, {
              attributes: ['productName', 'productImage']
            });
            item.dataValues.Product = product; // Assign product details to the item
          }
        }
      } else {
        // If not downloading, return paginated orders
        orders = await Order.findAndCountAll({
          include: [
            {
              model: OrderItem,
              where: { productId: productIds }
            }
          ],
          order: [[orderBy, order]],
          offset: offset,
          limit: perPage
        });
        // Enhance orders with product details
        for (const order of orders.rows) {
          for (const item of order.OrderItems) {
            const product = await getOneProduct({ productId: item.productId }, {
              attributes: ['productName', 'productImage']
            });
            item.dataValues.Product = product; // Assign product details to the item
          }
        }
      }

      const responseData = {
        error: false,
        msg: "Orders fetched successfully",
        data: isDownload === 'true' ? { rows: orders } : { rows: orders.rows },
        currentPage,
        perPage,
        totalPages: Math.ceil(orders.count / perPage),
        count: orders.count
      };

      return res.status(200).json(responseData);
    } catch (error) {
      console.error("Error listing orders of vendor:", error);
      return res.status(400).json({
        error: true,
        msg: error.message
      });
    }
  },

  //Get All Orders with pagination
  listOrders: async (req, res) => {
    try {
      const { orderBy = "orderId", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { orderStatus, startDate, endDate } = req.query;

      const whereClause = { ...filter };

      // Conditionally add date filter if startDate and endDate are provided
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.orderDate = { [Op.between]: [startDateObj, endDateObj] };
      }

      // Conditionally add order status filter if provided
      if (orderStatus) {
        whereClause.orderStatus = orderStatus;
      }

      // Fetch orders including associated order items
      const options = { where: whereClause, order: [[orderBy, order]], include: [{ model: OrderItem }] };
      const orders = await getOrderwithpagination(options, isDownload === 'true' ? {} : { offset, limit: perPage });

      // Construct response
      const responseData = {
        error: false,
        msg: `Orders fetched successfully`,
        data: isDownload === 'true'
          ? { rows: orders.rows }
          : {
            count: orders.count,
            rows: orders.rows.map(order => ({
              ...order.toJSON(),
              OrderItems: order.OrderItems.map(orderItem => ({
                orderItemID: orderItem.orderItemID,
                orderId: orderItem.orderId,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
                unitPrice: orderItem.unitPrice,
                subtotal: orderItem.subtotal
              }))
            })),
            perPage,
            currentPage,
            totalPages: Math.ceil(orders.count / perPage),
          },
      };

      // Return the response
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error listing orders:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get order By id
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await getOneOrder({ orderId: orderId });

      // Fetch user details
      const user = await getOneUser({ userId: order.customerId }, {
        attributes: ['firstName', 'lastName', 'email', 'mobile']
      });

      order.dataValues.User = user;

      // Populate product details for each order item
      for (const item of order.OrderItems) {
        const product = await getOneProduct({ productId: item.productId }, {
          attributes: ['productName', 'productImage']
        });
        item.dataValues.Product = product;
      }
      return res.status(200).json({ error: false, msg: 'Order retrieved successfully', data: order });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create Order
  // addOrder: async (req, res) => {
  //   try {
  //     const { customerId, billingDetails, shippingDetails, orderItems, } = req.body;

  //     const { billingName, billingAddress, billingEmail, billingMobileNumber } = billingDetails;
  //     const { shippingName, shippingAddress, shippingEmail, shippingMobileNumber } = shippingDetails;
  //     // Begin a transaction
  //     const t = await sequelize.transaction();
  //     try {
  //       // Iterate through each order item
  //       for (const item of orderItems) {
  //         // Retrieve the product
  //         const product = await getOneProduct({ productId: item.productId });
  //         // Check if product exists
  //         if (!product) {
  //           throw new Error(`Product with ID ${item.productId} not found`);
  //         }
  //         // Check if the ordered quantity exceeds the available quantity
  //         if (item.quantity > product.quantity) {
  //           throw new Error(`Ordered quantity for product ${item.productId} exceeds available quantity`);
  //         }
  //       }
  //       // Calculate total order amount based on order items
  //       const totalAmount = await Promise.all(orderItems.map(async (item) => {
  //         // Fetch the price of the product dynamically using getProductPrice
  //         const productPrice = await getProductPrice(item.productId);
  //         // Calculate subtotal for this order item
  //         return item.quantity * productPrice;
  //       })).then(subtotals => subtotals.reduce((total, subtotal) => total + subtotal, 0));
  //       // Create the order
  //       const newOrder = await createOrder({
  //         customerId,
  //         orderAmount: totalAmount,
  //         orderStatus: 'Pending',
  //         orderDate: new Date(),
  //         billingName,
  //         billingAddress,
  //         billingEmail,
  //         billingMobileNumber,
  //         shippingName,
  //         shippingAddress,
  //         shippingEmail,
  //         shippingMobileNumber,
  //       }, { transaction: t });
  //       // Create order items associated with the order
  //       await Promise.all(orderItems.map(async (item) => {
  //         await createOrderItem({
  //           orderId: newOrder.orderId,
  //           productId: item.productId,
  //           quantity: item.quantity,
  //           unitPrice: await getProductPrice(item.productId), // Fetch the unit price
  //           subtotal: item.quantity * (await getProductPrice(item.productId)), // Calculate subtotal
  //         }, { transaction: t });
  //         // Update product quantity
  //         await updateProductQuantity(item.productId, item.quantity, false, { transaction: t });
  //       }));
  //       // Commit the transaction
  //       await t.commit();
  //       // Create activity log for order creation
  //       const activityData = {
  //         userID: customerId, // Assuming customerId is used as userID
  //         tableName: 'orders',
  //         activityType: 'create_order',
  //         timestamp: new Date(),
  //         details: {
  //           billingName,
  //           billingAddress,
  //           billingEmail,
  //           billingMobileNumber,
  //           shippingName,
  //           shippingAddress,
  //           shippingEmail,
  //           shippingMobileNumber,
  //         }
  //       };
  //       // Stringify the details field if it's an array or an object
  //       if (typeof activityData.details === 'object') {
  //         activityData.details = JSON.stringify(activityData.details);
  //       }
  //       // Call the createActivityLog API in another microservice
  //       const method = 'POST';
  //       const url = process.env.CREATE_LOGS_URL;
  //       const headers = { 'Content-Type': 'application/json' };
  //       const activityLogApiResponse = await global.common.callMicroServiceApi(method, url, activityData, headers);

  //       if (activityLogApiResponse.error) {
  //         throw new Error(activityLogApiResponse.msg);
  //       }
  //       res.status(200).json({ error: false, msg: 'Order created successfully' });
  //     } catch (error) {
  //       // Rollback the transaction in case of an error
  //       await t.rollback();
  //       console.error('Error adding order:', error);
  //       res.status(400).json({ error: true, msg: error.message });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

  //Create Order
  addOrder: async (req, res) => {
    let t; // Transaction variable
    try {
      const { customerId, billingDetails, shippingDetails, orderItems, couponCode } = req.body;
      const { billingName, billingAddress, billingEmail, billingMobileNumber } = billingDetails;
      const { shippingName, shippingAddress, shippingEmail, shippingMobileNumber } = shippingDetails;
      t = await sequelize.transaction();
      try {
        for (const item of orderItems) {
          const product = await getOneProduct({ productId: item.productId });
          if (item.quantity > product.stock) {
            throw new Error(`Ordered quantity for product ${item.productId} exceeds available stock`);
          }
        }

        const { totalAmount } = await calculateOrderAmount(orderItems, couponCode);

        const newOrder = await createOrder({
          customerId,
          orderAmount: totalAmount,
          orderStatus: 'Pending',
          orderDate: new Date(),
          billingName,
          billingAddress,
          billingEmail,
          billingMobileNumber,
          shippingName,
          shippingAddress,
          shippingEmail,
          shippingMobileNumber,
          couponCode
        }, { transaction: t });

        await Promise.all(orderItems.map(async (item) => {
          await createOrderItem({
            orderId: newOrder.orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: await getProductPrice(item.productId),
            subtotal: item.quantity * (await getProductPrice(item.productId)),
          }, { transaction: t });
          await updateProductQuantity(item.productId, item.quantity, false, { transaction: t });
          await Product.increment('totalQuantitySold', {
            by: item.quantity,
            where: { productId: item.productId },
            transaction: t
          });
        }));

        await t.commit();
        const activityData = {
          userID: customerId,
          tableName: 'orders',
          activityType: 'create_order',
          timestamp: new Date(),
          details: {
            billingName,
            billingAddress,
            billingEmail,
            billingMobileNumber,
            shippingName,
            shippingAddress,
            shippingEmail,
            shippingMobileNumber,
          }
        };
        const notificationData = {
          userId: customerId,
          message: 'Your order has been successfully placed.',
          redirectType: "order",
          status: 'unread',
          referenceId: newOrder.orderId,
        };
        const method = 'POST';
        const logsurl = process.env.CREATE_LOGS_URL;
        const notificationurl = process.env.CREATE_NOTIFICATION_URL;
        const headers = { 'Content-Type': 'application/json' };
        const activityLogApiResponse = await global.common.callMicroServiceApi(method, logsurl, activityData, headers);
        const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);
        if (activityLogApiResponse.error) {
          throw new Error(activityLogApiResponse.msg);
        }
        if (notificationApiResponse.error) {
          throw new Error(notificationApiResponse.msg);
        }

        res.status(200).json({ error: false, msg: 'Order created successfully' });
      } catch (error) {
        if (t && t.finished !== 'commit') {
          await t.rollback();
        }
        res.status(400).json({ error: true, msg: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // addOrder: async (req, res) => {
  //   let t; // Transaction variable
  //   try {
  //     const { customerId, billingDetails, shippingDetails, orderItems, couponCode } = req.body;
  //     const { billingName, billingAddress, billingEmail, billingMobileNumber } = billingDetails;
  //     const { shippingName, shippingAddress, shippingEmail, shippingMobileNumber } = shippingDetails;

  //     t = await sequelize.transaction();
  //     try {
  //       // Check product quantities
  //       for (const item of orderItems) {
  //         const product = await getOneProduct({ productId: item.productId });
  //         if (item.quantity > product.quantity) {
  //           throw new Error(`Ordered quantity for product ${item.productId} exceeds available quantity`);
  //         }
  //       }

  //       // Calculate total amount
  //       const { totalAmount } = await calculateOrderAmount(orderItems, couponCode);

  //       // Create the order
  //       const newOrder = await createOrder({
  //         customerId,
  //         orderAmount: totalAmount,
  //         orderStatus: 'Pending',
  //         orderDate: new Date(),
  //         billingName,
  //         billingAddress,
  //         billingEmail,
  //         billingMobileNumber,
  //         shippingName,
  //         shippingAddress,
  //         shippingEmail,
  //         shippingMobileNumber,
  //         couponCode
  //       }, { transaction: t });

  //       // Create order items and update product quantities
  //       const vendorTotals = {}; // Object to hold totals for each vendor

  //       await Promise.all(orderItems.map(async (item) => {
  //         const product = await getOneProduct({ productId: item.productId });
  //         const vendorId = product.ownerId;

  //         // Update vendor totals
  //         if (!vendorTotals[vendorId]) {
  //           vendorTotals[vendorId] = { totalAmount: 0, productIds: [] };
  //         }
  //         const productPrice = await getProductPrice(item.productId);
  //         const subtotal = item.quantity * productPrice;
  //         vendorTotals[vendorId].totalAmount += subtotal; // Update totalAmount property
  //         vendorTotals[vendorId].productIds.push(item.productId);
  //         // Create order item
  //         await createOrderItem({
  //           orderId: newOrder.orderId,
  //           productId: item.productId,
  //           quantity: item.quantity,
  //           unitPrice: productPrice,
  //           subtotal: subtotal
  //         }, { transaction: t });

  //         // Update product quantity
  //         await updateProductQuantity(item.productId, item.quantity, false, { transaction: t });
  //       }));

  //       // Commit the transaction
  //       await t.commit();

  //       // Activity log and notification data
  //       const activityData = {
  //         userID: customerId,
  //         tableName: 'orders',
  //         activityType: 'create_order',
  //         timestamp: new Date(),
  //         details: {
  //           billingName,
  //           billingAddress,
  //           billingEmail,
  //           billingMobileNumber,
  //           shippingName,
  //           shippingAddress,
  //           shippingEmail,
  //           shippingMobileNumber,
  //         }
  //       };

  //       const notificationData = {
  //         userId: customerId,
  //         message: 'Your order has been successfully placed.',
  //         redirectType: "order",
  //         status: 'unread',
  //         referenceId: newOrder.orderId,
  //       };

  //       const method = 'POST';
  //       const logsurl = process.env.CREATE_LOGS_URL;
  //       const notificationurl = process.env.CREATE_NOTIFICATION_URL;
  //       const headers = { 'Content-Type': 'application/json' };

  //       const activityLogApiResponse = await global.common.callMicroServiceApi(method, logsurl, activityData, headers);
  //       const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);

  //       if (activityLogApiResponse.error) {
  //         throw new Error(activityLogApiResponse.msg);
  //       }
  //       if (notificationApiResponse.error) {
  //         throw new Error(notificationApiResponse.msg);
  //       }

  //       // Update wallet history for each vendor
  //       for (const vendorId in vendorTotals) {
  //         const { totalAmount, productIds } = vendorTotals[vendorId];

  //         let commissionPercentage = await getSettingValue('commission_percentage');
  //         commissionPercentage = parseFloat(commissionPercentage.replace('%', ''));
  //         const commissionAmount = (totalAmount * commissionPercentage) / 100;
  //         const finalAmount = totalAmount - commissionAmount;
  //         // Fetch the previous wallet balance for the vendor
  //         let previousAmount = 0;
  //         const previousWalletHistory = await WalletHistory.findOne({
  //           where: { vendorId: vendorId },
  //           order: [['createdAt', 'DESC']] // Order entries by creation date in descending order
  //         });

  //         if (previousWalletHistory) {
  //           previousAmount = previousWalletHistory.currentAmount;
  //         }

  //         const currentAmount = previousAmount + finalAmount;
  //         // Log vendor ID and calculated amounts
  //         console.log(`Vendor ID: ${vendorId}`);
  //         console.log(`Total Amount: ${totalAmount}`);
  //         console.log(`Commission Amount: ${commissionAmount}`);
  //         console.log(`Final Amount: ${finalAmount}`);
  //         console.log(`Previous Amount: ${previousAmount}`);
  //         console.log(`Current Amount: ${currentAmount}`);

  //         const walletHistoryData = {
  //           vendorId,
  //           amount: finalAmount,
  //           orderId: newOrder.orderId,
  //           type: 'Debit',
  //           previousAmount: previousAmount,
  //           currentAmount: currentAmount
  //         };

  //         const walletHistoryurl = process.env.CREATE_WALLET_HISTORIES_URL;
  //         const walletHistoryApiResponse = await global.common.callMicroServiceApi(method, walletHistoryurl, walletHistoryData, headers);

  //         if (walletHistoryApiResponse.error) {
  //           throw new Error(walletHistoryApiResponse.msg);
  //         }
  //       }

  //       res.status(200).json({ error: false, msg: 'Order created successfully' });

  //     } catch (error) {
  //       if (t && t.finished !== 'commit') {
  //         await t.rollback();
  //       }
  //       res.status(400).json({ error: true, msg: error.message });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

  // Update Order
  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { customerId, billingDetails, shippingDetails, orderItems, couponCode } = req.body;
      const t = await sequelize.transaction();
      try {
        // Fetch the existing order and its items
        const existingOrder = await getOneOrder({ orderId });

        const existingOrderItems = await getOrderItems({ orderId });

        // Revert product quantities based on the current order items
        for (const item of existingOrderItems) {
          await getOneProduct({ productId: item.productId });
          await updateProductQuantity(item.productId, item.quantity, true, t);
          await Product.increment('totalQuantitySold', {
            by: -item.quantity,
            where: { productId: item.productId }
          });
        }

        // Delete existing order items associated with the order being updated
        await OrderItem.destroy({ where: { orderId } }, { transaction: t });

        // Add or update order items
        for (const item of orderItems) {
          await getOneProduct({ productId: item.productId })
          // Create order item
          await createOrderItem({
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: await getProductPrice(item.productId),
            subtotal: item.quantity * (await getProductPrice(item.productId))

          }, { transaction: t });

          // Update product quantity with the new quantity
          await updateProductQuantity(item.productId, item.quantity, false, t);
          await Product.increment('totalQuantitySold', {
            by: item.quantity,
            where: { productId: item.productId }
          });
        }

        // Recalculate order amount and apply discount
        const { totalAmount } = await calculateOrderAmount(orderItems, couponCode);

        // Prepare update data for the order
        const updateData = {
          customerId,
          ...billingDetails,
          ...shippingDetails,
          orderAmount: totalAmount,
          couponCode: couponCode ? couponCode : null
        };

        // Update the order details
        await existingOrder.update(updateData, { transaction: t });

        await t.commit();

        res.status(200).json({
          error: false,
          msg: `Order updated successfully`
        });
      } catch (error) {
        await t.rollback();
        console.error('Error updating order:', error);
        res.status(400).json({ error: true, msg: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Update Order Status
  // updateOrderStatus: async (req, res) => {
  //   try {
  //     const { orderId } = req.params;
  //     const { orderStatus, email, username } = req.body;

  //     const updatedOrderStatus = await updateOrder({ orderId: orderId }, { orderStatus: orderStatus });

  //     const orderItems = updatedOrderStatus.OrderItems.map(item => ({
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       unitPrice: item.unitPrice,
  //       subtotal: item.subtotal
  //     }));

  //     let orderItemsHtml = '';
  //     orderItems.forEach(item => {
  //       orderItemsHtml += `<tr>
  //       <td>${item.productId}</td>
  //       <td>${item.quantity}</td>
  //       <td>${item.unitPrice}</td>
  //       <td>${item.subtotal}</td>
  //     </tr>`;
  //     });

  //     const userData = {
  //       email,
  //       username,
  //       orderStatus,
  //       orderItems:orderItemsHtml,
  //       orderId: updatedOrderStatus.orderId,
  //       orderDate: updatedOrderStatus.orderDate,
  //       shippingAddress: updatedOrderStatus.shippingAddress,
  //       billingAddress: updatedOrderStatus.billingAddress,
  //       orderAmount: updatedOrderStatus.orderAmount,
  //     }

  //     const notificationData = {
  //       userId: updatedOrderStatus.customerId,
  //       message: 'Your order status has been updated.',
  //       redirectType: "order",
  //       status: 'unread',
  //       referenceId: orderId,
  //     };

  //     const activityData = {
  //       userID: orderId,
  //       tableName: 'orders',
  //       activityType: 'update_order_status',
  //       timestamp: new Date(),
  //       details: {
  //         orderStatus,
  //         email,
  //         username
  //       }
  //     };

  //     const method = 'POST';
  //     const logsurl = process.env.CREATE_LOGS_URL;
  //     const sendemailurl=process.env.SEND_EMAIL_URL;
  //     const notificationurl=process.env.CREATE_NOTIFICATION_URL;
  //     const headers = { 'Content-Type': 'application/json' };
  //     // Replace placeholders in the email template
  //     const emailTemplate = await getOneEmailTemplate({ slug: 'order-status-change-notification' });
  //     if (!emailTemplate) {
  //       throw new Error("Email Template not found");
  //     }

  //     // Replace placeholders in the email template
  //     let replacedTemplate = emailTemplate.bodyHtml;
  //     replacedTemplate = replacedTemplate.replace(/{username}/g, userData.username);
  //     replacedTemplate = replacedTemplate.replace(/{orderId}/g, userData.orderId);
  //     replacedTemplate = replacedTemplate.replace(/{orderDate}/g, userData.orderDate);
  //     replacedTemplate = replacedTemplate.replace(/{orderStatus}/g, userData.orderStatus);
  //     replacedTemplate = replacedTemplate.replace(/{orderItems}/g, orderItemsHtml);

  //     const emailApiResponse = await global.common.callMicroServiceApi(method,sendemailurl, {
  //       templateName: "order-status-change-notification",
  //       userData: userData,
  //       emailBody: replacedTemplate
  //     }, headers);
  //     if (emailApiResponse.error) {
  //       throw new Error('Error from send email:', emailApiResponse.msg);
  //     }
  //     const activityLogApiResponse = await global.common.callMicroServiceApi(method, logsurl, activityData, headers);
  //     const notificationApiResponse = await global.common.callMicroServiceApi(method, notificationurl, notificationData, headers);
  //     if (activityLogApiResponse.error) {
  //       throw new Error(activityLogApiResponse.msg);
  //     }
  //     if (notificationApiResponse.error) {
  //       throw new Error(notificationApiResponse.msg);
  //     }

  //     res.status(200).json({ error: false, msg: 'Order status updated successfully' });
  //   } catch (error) {
  //     res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

  // Update Order Status
  updateOrderStatus: async (req, res) => {
    let t; // Transaction variable
    try {
      const { orderId } = req.params;
      const { orderStatus, email, username } = req.body;

      t = await sequelize.transaction();
      try {
        const updatedOrderStatus = await updateOrder({ orderId: orderId }, { orderStatus: orderStatus }, { transaction: t });

        if (orderStatus === 'Processing') {
          const orderItems = await getAllOrderItems({ where: { orderId } });


          const vendorOrderAmounts = {}; // Object to hold totals for each vendor
          await Promise.all(orderItems.map(async (item) => {
            const product = await getOneProduct({ productId: item.productId });
            const vendorId = product.ownerId;

            // Update vendor totals
            if (!vendorOrderAmounts[vendorId]) {
              vendorOrderAmounts[vendorId] = { totalAmount: 0, productIds: [] };
            }
            const productPrice = await getProductPrice(item.productId);
            const subtotal = item.quantity * productPrice;
            vendorOrderAmounts[vendorId].totalAmount += subtotal; // Update totalAmount property
            vendorOrderAmounts[vendorId].productIds.push(item.productId);
          }));

          await Promise.all(Object.keys(vendorOrderAmounts).map(async (vendorId) => {
            const { totalAmount } = vendorOrderAmounts[vendorId];

            let commissionPercentage;
            const vendorDetails = await getSingleVendorCompanyDetails({ userId: vendorId });
            if (vendorDetails && vendorDetails.vendorCommission!== 0 ) {
              commissionPercentage = vendorDetails.vendorCommission;
            } else {
              commissionPercentage = await getSettingValue('commission_percentage');

            }
            const commissionAmount = (totalAmount * commissionPercentage) / 100;
            const finalAmount = totalAmount - commissionAmount;

            // Fetch the previous wallet balance for the vendor
            let previousAmount = 0;
            const previousWalletHistory = await getSingleWalletHistory({
              vendorId:vendorId,
              orderId: orderId
            });

            if (previousWalletHistory) {
              previousAmount = previousWalletHistory.currentAmount;
            }

            const currentAmount = previousAmount + finalAmount;

            const walletHistoryData = {
              vendorId,
              amount: finalAmount,
              orderId,
              type: 'Credit',
              previousAmount,
              currentAmount
            };

            const walletHistoryUrl = process.env.CREATE_WALLET_HISTORIES_URL;
            const walletHistoryApiResponse = await global.common.callMicroServiceApi('POST', walletHistoryUrl, walletHistoryData, { 'Content-Type': 'application/json' });

            if (walletHistoryApiResponse.error) {
              throw new Error(walletHistoryApiResponse.msg);
            }
          }));
        }

        // Email template and other notifications
        const emailTemplate = await getOneEmailTemplate({ slug: 'order-status-change-notification' });
        if (!emailTemplate) {
          throw new Error("Email Template not found");
        }

        const orderItems = updatedOrderStatus.OrderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal
        }));

        let orderItemsHtml = '';
        orderItems.forEach(item => {
          orderItemsHtml += `<tr>
        <td>${item.productId}</td>
        <td>${item.quantity}</td>
        <td>${item.unitPrice}</td>
        <td>${item.subtotal}</td>
      </tr>`;
        });

        const userData = {
          email,
          username,
          orderStatus,
          orderItems: orderItemsHtml,
          orderId: updatedOrderStatus.orderId,
          orderDate: updatedOrderStatus.orderDate,
          shippingAddress: updatedOrderStatus.shippingAddress,
          billingAddress: updatedOrderStatus.billingAddress,
          orderAmount: updatedOrderStatus.orderAmount,
        };

        const replacedTemplate = emailTemplate.bodyHtml
          .replace(/{username}/g, userData.username)
          .replace(/{orderId}/g, userData.orderId)
          .replace(/{orderDate}/g, userData.orderDate)
          .replace(/{orderStatus}/g, userData.orderStatus)
          .replace(/{orderItems}/g, userData.orderItems);

        const emailApiResponse = await global.common.callMicroServiceApi('POST', process.env.SEND_EMAIL_URL, {
          templateName: "order-status-change-notification",
          userData: userData,
          emailBody: replacedTemplate
        }, { 'Content-Type': 'application/json' });

        if (emailApiResponse.error) {
          throw new Error('Error from send email:', emailApiResponse.msg);
        }

        const activityData = {
          userID: orderId,
          tableName: 'orders',
          activityType: 'update_order_status',
          timestamp: new Date(),
          details: {
            orderStatus,
            email,
            username
          }
        };

        const notificationData = {
          userId: updatedOrderStatus.customerId,
          message: 'Your order status has been updated.',
          redirectType: "order",
          status: 'unread',
          referenceId: orderId,
        };

        const activityLogApiResponse = await global.common.callMicroServiceApi('POST', process.env.CREATE_LOGS_URL, activityData, { 'Content-Type': 'application/json' });
        const notificationApiResponse = await global.common.callMicroServiceApi('POST', process.env.CREATE_NOTIFICATION_URL, notificationData, { 'Content-Type': 'application/json' });

        if (activityLogApiResponse.error) {
          throw new Error(activityLogApiResponse.msg);
        }
        if (notificationApiResponse.error) {
          throw new Error(notificationApiResponse.msg);
        }

        await t.commit();
        res.status(200).json({ error: false, msg: 'Order status updated successfully' });

      } catch (error) {
        if (t && t.finished !== 'commit') {
          await t.rollback();
        }
        res.status(400).json({ error: true, msg: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Order
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;

      // Get the order to check if it exists
      const order = await getOneOrder({ orderId });
      if (!order) {
        return res.status(404).json({ error: true, msg: `Order with ID ${orderId} not found` });
      }

      // Get order items associated with the order
      const orderItems = await getOrderItems({ orderId });

      // Increment product quantities for each order item
      await Promise.all(orderItems.map(async (item) => {
        await updateProductQuantity(item.productId, item.quantity);
      }));

      // Delete order items associated with the order
      await deleteOrderItems({ orderId });

      // Delete the order
      await deleteOrder({ orderId });

      res.status(200).json({ error: false, msg: `Order Deleted successfully` });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Order
  bulkDeleteOrders: async (req, res) => {
    try {
      const { orderIds } = req.body; // Assuming orderIds is an array of order IDs

      // Check if all orders exist
      const orders = await Promise.all(orderIds.map(orderId => getOneOrder({ orderId })));
      const missingOrders = orders.filter(order => !order);
      if (missingOrders.length > 0) {
        const missingOrderIds = missingOrders.map(order => order.orderId).join(', ');
        return res.status(404).json({ error: true, msg: `Orders with IDs ${missingOrderIds} not found` });
      }

      // Get order items associated with the orders
      const orderItems = await Promise.all(orderIds.map(orderId => getOrderItems({ orderId })));

      // Increment product quantities for each order item
      await Promise.all(orderItems.flat().map(async (item) => {
        await updateProductQuantity(item.productId, item.quantity);
      }));

      // Delete order items associated with the orders
      await Promise.all(orderIds.map(orderId => deleteOrderItems({ orderId })));

      // Delete the orders
      await Promise.all(orderIds.map(orderId => deleteOrder({ orderId })));

      res.status(200).json({ error: false, msg: `Orders Deleted successfully` });
    } catch (error) {
      console.error('Error deleting orders:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  }

}

module.exports = orderApi;

