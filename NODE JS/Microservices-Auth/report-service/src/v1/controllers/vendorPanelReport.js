const { Op } = require("sequelize");
const { getAllProducts, countProducts, getOneProduct } = require('../../../../product-service/src/v1/services/products');
const Order = require("../../../../order-service/src/v1/models/order");
const OrderItem = require("../../../../order-service/src/v1/models/orderItem");
const Product = require("../../../../product-service/src/v1/models/product");
const VendorCompanyDetails = require("../../../../users-service/src/v1/models/vendorCompanyDetails");
const { getSettingValue } = require("../../../../order-service/src/v1/helpers/chche-helper");


const vendorReportApi = {

  //view low stock products vendor side
  viewLowStockProducts: async (req, res) => {
    try {
      const ownerId = req.user.userId;

      const maxQuantity = process.env.MAX_QUANTITY || 10;

      // Fetch products with quantity less than 10 using Sequelize's model method
      const lowStockProducts = await getAllProducts({
        where: {
          stock: {
            [Op.lt]: maxQuantity // Using less than operator
          },
          ownerId: ownerId
        }
      });
      // Count low stock products
      const lowStockProductCount = await countProducts({

        stock: {
          [Op.lt]: maxQuantity // Using less than operator
        },
        ownerId: ownerId

      });

      // Return the low stock products
      res.status(200).json({
        error: false,
        msg: `Low stock products fetched successfully`,
        data: {
          products: lowStockProducts,
          count: lowStockProductCount
        }
      });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Most sold products
  getMostSoldProducts: async (req, res) => {
    try {
      const ownerId = req.user.userId;
      const { orderBy = "totalQuantitySold", order = "DESC", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const {startDate, endDate } = req.query
      let whereClause = { ownerId, ...filter };

      // Conditionally add date filter if startDate and endDate are provided
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause = {
          ...whereClause,
          createdAt: { [Op.between]: [startDateObj, endDateObj] }
        };
      }


      let mostSoldProducts;
      if (isDownload === 'true') {
        // Fetch products without pagination
        mostSoldProducts = await Product.findAll({
          where: whereClause,
          order: [[orderBy, order]]
        });
      } else {
        // Fetch products with pagination
        mostSoldProducts = await Product.findAndCountAll({
          where: whereClause,
          order: [[orderBy, order]],
          limit: perPage,
          offset: offset
        });

      }

      const responseData = {
        error: false,
        msg: "Most sold products fetched successfully",
        data: isDownload === 'true' ?{rows: mostSoldProducts} : {rows:mostSoldProducts.rows},
        currentPage: isDownload === 'true' ? undefined : currentPage,
        perPage: isDownload === 'true' ? undefined : perPage,
        totalPages: isDownload === 'true' ? undefined : Math.ceil(mostSoldProducts.count / perPage),
        count: isDownload === 'true' ? mostSoldProducts.length : mostSoldProducts.count
      };

      return res.status(200).json(responseData);

    } catch (error) {
      console.error('Error fetching most sold products:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // View orders By filters
  viewOrdersByFilters: async (req, res) => {
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
        data: isDownload === 'true' ? { rows: orders } : {rows:orders.rows},
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

  //Genrate Mounthly revenue
  generateMonthlyRevenue: async (req, res) => {
    try {
      const vendorId = req.user.userId;
      const { month } = req.query; // Extracting the month from the request query

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const calculateRevenue = async (month) => {
        // Define start and end date for the month
        const start = new Date(currentYear, month - 1, 1);
        const end = new Date(currentYear, month, 0);
        end.setHours(23, 59, 59, 999);

        // Fetch orders based on date range
        const orders = await Order.findAll({
          where: {
            createdAt: { [Op.between]: [start, end] }
          },
          include: [{
            model: OrderItem
          }]
        });

        // Calculate monthly revenue
        let totalRevenue = 0;

        await Promise.all(orders.map(async (order) => {
          const orderItems = order.OrderItems;

          for (const item of orderItems) {
            const subtotal = item.quantity * item.unitPrice;
            const vendor = await VendorCompanyDetails.findOne({ where: { userId: vendorId } });
            let commissionRate = vendor && vendor.vendorCommission ? vendor.vendorCommission : 0;

            // If the commission rate is 0, fetch default commission rate from settings table
            if (commissionRate === 0) {
              const defaultCommissionRate = await getSettingValue('commission_percentage');
              commissionRate = defaultCommissionRate || 0;
            }
            const commissionAmount = subtotal * (commissionRate / 100);
            const revenueAfterCommission = subtotal - commissionAmount;

            totalRevenue += revenueAfterCommission;
          }
        }));

        // Format total revenue to two decimal places
        totalRevenue = parseFloat(totalRevenue.toFixed(2));

        return {
          month: month,
          year: currentYear,
          totalRevenue: totalRevenue
        };
      };

      // Array to hold monthly revenue data
      const monthlyRevenue = [];

      if (month) {
        // Calculate revenue for the specified month
        const revenue = await calculateRevenue(parseInt(month));
        monthlyRevenue.push(revenue);
      } else {
        // Calculate revenue for each month of the year
        for (let month = 1; month <= currentMonth; month++) {
          const revenue = await calculateRevenue(month);
          monthlyRevenue.push(revenue);
        }
      }

      // Return the monthly revenue report
      res.status(200).json({ error: false, msg: 'Monthly revenue report generated successfully', data: { rows: monthlyRevenue } });
    } catch (error) {
      console.error('Error generating monthly revenue report:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },


  //graph
  // //Genrate Mounthly revenue
  // generateMonthlyRevenue: async (req, res) => {
  //   try {
  //     const vendorId = req.user.userId;
  //     const { month, productIds } = req.query; // Extracting the month and productIds from the request query

  //     const currentYear = new Date().getFullYear();
  //     let productIdsArray = productIds ? productIds.split(',').map(id => parseInt(id)) : [];

  //     // If no product IDs are provided, fetch all products owned by the vendor
  //     if (!productIdsArray.length) {
  //       const products = await Product.findAll({
  //         where: { ownerId: vendorId },
  //         attributes: ['productId']
  //       });

  //       productIdsArray = products.map(product => product.productId);

  //       if (!productIdsArray.length) {
  //         productIdsArray.push(null); // Ensuring the IN clause doesn't fail
  //       }
  //     }

  //     const calculateRevenue = async (month) => {
  //       // Define start and end date for the month
  //       const start = new Date(currentYear, month - 1, 1);
  //       const end = new Date(currentYear, month, 0);
  //       end.setHours(23, 59, 59, 999);

  //       // Fetch orders based on date range and product filters
  //       const orders = await Order.findAll({
  //         include: [{
  //           model: OrderItem,
  //           where: {
  //             productId: { [Op.in]: productIdsArray },
  //             createdAt: { [Op.between]: [start, end] }
  //           },
  //           required: true
  //         }]
  //       });

  //       // Calculate monthly revenue for each product
  //       const revenueByProduct = {};

  //       await Promise.all(orders.map(async (order) => {
  //         const orderItems = await OrderItem.findAll({
  //           where: {
  //             orderId: order.orderId,
  //             productId: { [Op.in]: productIdsArray }
  //           }
  //         });

  //         for (const item of orderItems) {
  //           const subtotal = item.quantity * item.unitPrice;
  //           const vendor = await VendorCompanyDetails.findOne({ where: { userId: vendorId } });
  //           let commissionRate = vendor && vendor.vendorCommission ? vendor.vendorCommission : 0;

  //           // If the commission rate is 0, fetch default commission rate from settings table
  //           if (commissionRate === 0) {
  //             const defaultCommissionRate = await getSettingValue('commission_percentage');
  //             commissionRate = defaultCommissionRate || 0;
  //           }
  //           const commissionAmount = subtotal * (commissionRate / 100);
  //           const revenueAfterCommission = subtotal - commissionAmount;

  //           if (!revenueByProduct[item.productId]) {
  //             revenueByProduct[item.productId] = 0;
  //           }
  //           revenueByProduct[item.productId] += revenueAfterCommission;
  //         }
  //       }));
  //       // Format revenues to two decimal places
  //       for (const productId in revenueByProduct) {
  //         revenueByProduct[productId] = parseFloat(revenueByProduct[productId].toFixed(2));
  //       }
  //       return {
  //         month: month,
  //         year: currentYear,
  //         revenueByProduct: revenueByProduct
  //       };
  //     };
  //     // Array to hold monthly revenue data
  //     const monthlyRevenue = [];
  //     if (month) {
  //       // Calculate revenue for the specified month
  //       const revenue = await calculateRevenue(parseInt(month));
  //       monthlyRevenue.push(revenue);
  //     } else {
  //       // Calculate revenue for each month of the year
  //       for (let month = 1; month <= 12; month++) {
  //         const revenue = await calculateRevenue(month);
  //         monthlyRevenue.push(revenue);
  //       }
  //     }
  //     // Return the monthly revenue report
  //     res.status(200).json({ error: false, msg: 'Monthly revenue report generated successfully', data: { rows: monthlyRevenue } });
  //   } catch (error) {
  //     console.error('Error generating monthly revenue report:', error);
  //     res.status(400).json({ error: true, msg: error.message });
  //   }
  // },

}

module.exports = vendorReportApi;
