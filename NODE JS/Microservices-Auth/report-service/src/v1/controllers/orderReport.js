/* eslint-disable indent */
const { getOrderwithpagination, countOrders } = require("../../../../order-service/src/v1/services/order");
const { Op } = require("sequelize");
const Product = require("../../../../product-service/src/v1/models/product");
const OrderItem = require("../../../../order-service/src/v1/models/orderItem");


const orderReportApi = {

  //get last 15 days orders
  getLast15DaysOrderStatus: async (req, res) => {
    try {
      // Initialize an array to hold the order stats for the last 15 days
      const orderStats = [];

      // Calculate today's date
      const today = new Date();

      // Loop through each of the last 15 days
      for (let i = 0; i < 15; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i); // Decrement the date by i days

        // Count the orders for the current date
        const orderCount = await countOrders({
          createdAt: {
            [Op.between]: [
              new Date(currentDate.setHours(0, 0, 0, 0)),
              new Date(currentDate.setHours(23, 59, 59, 999))
            ]
          }
        });

        // Format the date to YYYY-MM-DD string
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Push the order count to the stats array
        orderStats.push({
          date: formattedDate,
          totalOrders: orderCount
        });
      }

      res.status(200).json({
        error: false,
        msg: 'Last 15 days order stats retrieved successfully',
        data: {rows:orderStats}
      });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get orders By filters
  getOrdersByFilters: async (req, res) => {
    try {
      const { orderBy = "createdAt", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const { startDate, endDate, status, minAmount, maxAmount } = req.query;
      const whereClause = {};
      // Parsing query parameters
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.createdAt = { [Op.between]: [startDateObj, endDateObj] };
      }
      if (status) {
        whereClause.orderStatus = status;
      }
      if (minAmount !== undefined && maxAmount !== undefined) {
        const min = parseFloat(minAmount);
        const max = parseFloat(maxAmount);
        whereClause.orderAmount = { [Op.between]: [min, max] };
      }
      Object.assign(whereClause, filter);

      // Fetching orders
      const data = await getOrderwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
        include: OrderItem
      });

      if (!data) {
        return res.status(404).json({ error: true, msg: "An issue occurred while fetching orders" });
      }

      // Handling different cases
      let responseData;
      if (isDownload === 'true') {
        // If downloading, return all orders without pagination
        const formattedOrders = await Promise.all(data.rows.map(async order => {
          const products = await Promise.all(order.OrderItems.map(async item => {
            const product = await Product.findByPk(item.productId);
            return product.productName;
          }));
          return {
            orderDate: order.orderDate,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderId: order.orderId,
            customerId: order.customerId,
            orderAmount: order.orderAmount,
            orderStatus: order.orderStatus,
            couponCode: order.couponCode,
            products
          };
        }));
        responseData = {
          error: false,
          msg: 'Orders fetched successfully',
          data: {rows:formattedOrders}
        };
      } else {
        // If not downloading, return paginated data
        const formattedOrders = await Promise.all(data.rows.map(async order => {
          const products = await Promise.all(order.OrderItems.map(async item => {
            const product = await Product.findByPk(item.productId);
            return product.productName;
          }));
          return {
            orderDate: order.orderDate,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderId: order.orderId,
            customerId: order.customerId,
            orderAmount: order.orderAmount,
            orderStatus: order.orderStatus,
            couponCode: order.couponCode,
            products
          };
        }));
        responseData = {
          error: false,
          msg: 'Orders fetched successfully',
          data: {
            count: data.count,
            rows: formattedOrders,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        }
      }

      return res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching orders by filters:', error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

}

module.exports = orderReportApi;
