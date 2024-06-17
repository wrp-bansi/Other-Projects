/* eslint-disable max-lines-per-function */

const {updateDashboardCount, calculateTotalAdminRevenue} = require('../services/dashboard');
const {countUsers} = require('../../../../users-service/src/v1/services/users');
const {countProducts} = require('../../../../product-service/src/v1/services/products');
const {getCategoryCount, getSubItems} = require('../../../../product-service/src/v1/services/categories');
const {Sequelize} = require('sequelize');
const {countOrders } = require('../../../../order-service/src/v1/services/order');
const {countWishlists} = require('../../../../users-service/src/v1/services/wishList');
const Order = require('../../../../order-service/src/v1/models/order');
const { Op } = require("sequelize");
const { countReviews } = require('../../../../product-service/src/v1/services/review');
const OrderItem = require('../../../../order-service/src/v1/models/orderItem');
const Product = require('../../../../product-service/src/v1/models/product');
const VendorCompanyDetails = require('../../../../users-service/src/v1/models/vendorCompanyDetails');
const { getSettingValue } = require('../../../../order-service/src/v1/helpers/chche-helper');
const WalletHistory = require('../../../../revenew-service/src/v1/models/walletHistory');


const dashboardApi = {

  //update Dshbord and get all report
  updateDashboard: async (req, res) => {
    try {
      const today = new Date();
      const lastWeek = new Date();
      const lastMonth = new Date();

      today.setHours(0, 0, 0, 0);
      lastWeek.setDate(lastWeek.getDate() - 7);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const todayRegisterCount = await countUsers({
        createdAt: {[Sequelize.Op.gte]: today}
      });

      const totalRegisterCount = await countUsers();

      const todayActiveUsersCount = await countUsers({
        lastLoginAt: {[Sequelize.Op.gte]: today}
      });

      const lastWeekActiveUsersCount = await countUsers({
        lastLoginAt: {[Sequelize.Op.gte]: lastWeek}
      });

      const lastMonthActiveUsersCount = await countUsers({
        lastLoginAt: {[Sequelize.Op.gte]: lastMonth}
      });

      const activeUsersCount = await countUsers({
        lastLoginAt: {[Sequelize.Op.ne]: null}
      });

      const totalProductsCount = await countProducts();

      const totalCategoriesCount = await getCategoryCount();

      const subCategories = await getSubItems();

      let totalSubCategoryCount = 0;
      subCategories.forEach(category => {
        totalSubCategoryCount += category.parentCategoryId ? 1 : 0;
      });

      const todayOrderCount = await countOrders({
        createdAt: {[Sequelize.Op.gte]: today}
      });

      const totalOrderCount = await countOrders();
      const thisWeekOrderCount = await countOrders({
        createdAt: { [Sequelize.Op.gte]: lastWeek }
      });

      const totalWishlistCount = await countWishlists();

      const totalVendorsCount = await countUsers({roleId: 1});

      const pendingVendorApprovalsCount = await countUsers({roleId: 1,userStatus: 'Unverified'});

      const totalAdminRevenue = await calculateTotalAdminRevenue();

      await Promise.all([
        updateDashboardCount(todayRegisterCount, 'todayRegister'),
        updateDashboardCount(totalRegisterCount, 'totalRegister'),
        updateDashboardCount(todayActiveUsersCount, 'todayActiveUsers'),
        updateDashboardCount(lastWeekActiveUsersCount, 'lastWeekActiveUsers'),
        updateDashboardCount(lastMonthActiveUsersCount, 'lastMonthActiveUsers'),
        updateDashboardCount(activeUsersCount, 'totalActiveUsers'),
        updateDashboardCount(totalProductsCount, 'totalProducts'),
        updateDashboardCount(totalCategoriesCount, 'totalCategories'),
        updateDashboardCount(totalSubCategoryCount, 'totalSubCategories'),
        updateDashboardCount(todayOrderCount, 'todayOrder'),
        updateDashboardCount(totalOrderCount, 'totalOrder'),
        updateDashboardCount(thisWeekOrderCount, 'thisWeekOrder'),
        updateDashboardCount(totalWishlistCount, 'totalWishlist'),
        updateDashboardCount(totalVendorsCount, 'totalVendors'),
        updateDashboardCount(pendingVendorApprovalsCount, 'pendingVendorApprovals'),
        updateDashboardCount(totalAdminRevenue, 'totalRevenue'),
      ]);
      res.status(200).json({
        error: false,
        msg: 'Dashboard updated successfully',
        data: {
          todayRegisterUser: todayRegisterCount,
          totalRegisterUsers: totalRegisterCount,
          todayActiveUsersCount: todayActiveUsersCount,
          lastWeekActiveUsersCount: lastWeekActiveUsersCount,
          lastMonthActiveUsersCount: lastMonthActiveUsersCount,
          totalActiveUsers: activeUsersCount,
          totalProductsCount: totalProductsCount,
          totalCategoriesCount: totalCategoriesCount,
          totalSubCategoryCount: totalSubCategoryCount,
          todayOrderCount: todayOrderCount,
          totalOrderCount: totalOrderCount,
          thisWeekOrderCount: thisWeekOrderCount,
          totalWishlistCount: totalWishlistCount,
          totalVendorsCount:totalVendorsCount,
          pendingVendorApprovalsCount:pendingVendorApprovalsCount,
          totalRevenue: totalAdminRevenue
        }
      });
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // customer Dashboard count
  getDashboardCountsOfCustomer : async (req, res) => {
    try {
      const customerId = req.user.userId;

      // Total Orders
      const totalOrderCount = await countOrders({customerId});

      // Total Transaction Amount
      const totalTransactionAmount = await Order.sum('orderAmount', {
        where: { customerId }
      });

      // Last Month Orders
      const firstDayOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
      lastDayOfLastMonth.setHours(23, 59, 59, 999);
      const lastMonthOrderCount = await Order.count({
        where: {
          customerId,
          createdAt: { [Op.between]: [firstDayOfLastMonth, lastDayOfLastMonth] }
        }
      });

      // Last Week Orders
      const firstDayOfLastWeek = new Date();
      firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() - 7);
      const lastWeekOrderCount = await Order.count({
        where: {
          customerId,
          createdAt: { [Op.gte]: firstDayOfLastWeek }
        }
      });

      // Pending Orders
      const pendingOrdersCount = await countOrders({

        customerId: customerId,
        orderStatus: 'Pending'

      });

      // Response data
      const orderCounts = {
        totalOrderCount,
        totalTransactionAmount,
        lastMonthOrderCount,
        lastWeekOrderCount,
        pendingOrdersCount
      };

      return res.status(200).json({
        error: false,
        msg: 'Customer Dashboard counts fetched successfully',
        data: orderCounts
      });
    } catch (error) {
      console.error('Error fetching customer order counts:', error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

  // vendor Dashboard count
  getDashboardCountsOfVendor : async (req, res) => {
    try {
      const vendorId = req.user.userId;
      const maxQuantity = process.env.MAX_QUANTITY || 10;

      // Fetch product IDs for the vendor
      const products = await Product.findAll({
        where: { ownerId: vendorId },
        attributes: ['productId']
      });

      const productIds = products.map(product => product.productId);

      // If no products are found, set productIds to an empty array
      if (!productIds.length) {
        productIds.push(null); // Ensuring the IN clause doesn't fail
      }

      // Total Orders: Number of orders containing the vendor's products
      const totalOrders = await Order.count({
        include: [{
          model: OrderItem,
          where: { productId: { [Op.in]: productIds } },
          required: true
        }]
      });

      // Monthly Sales: Sum of order amounts for the current month for the vendor's products
      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999);


      // Monthly Revenue: Calculate admin's share of the revenue
      const orders = await Order.findAll({
        include: [{
          model: OrderItem,
          where: { productId: { [Op.in]: productIds } },
          createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
          required: true
        }]
      });

      // Monthly Revenue Calculation
      let monthlyRevenue = 0;
      await Promise.all(orders.map(async (order) => {
        let orderSubtotal = 0; // Initialize orderSubtotal
        const orderItems = await OrderItem.findAll({
          where: {
            orderId: order.orderId,
            productId: { [Op.in]: productIds } // Filter by product IDs owned by vendor 58
          }
        });
        for (const item of orderItems) {
          const subtotal = item.quantity * item.unitPrice;
          orderSubtotal += subtotal;
        }
        const vendor = await VendorCompanyDetails.findOne({ where: { userId: vendorId } });
        let commissionRate = vendor && vendor.vendorCommission ? vendor.vendorCommission : 0;

        // If the commission rate is 0, fetch default commission rate from settings table
        if (commissionRate === 0) {
          const defaultCommissionRate = await getSettingValue('commission_percentage');
          commissionRate = defaultCommissionRate || 0;
        }
        const commissionAmount = orderSubtotal * (commissionRate / 100);
        const revenueAfterCommission = orderSubtotal - commissionAmount;
        monthlyRevenue += revenueAfterCommission;
      }));
      // Format monthlyRevenue to two decimal places
      monthlyRevenue = parseFloat(monthlyRevenue.toFixed(2));

      // Pending Orders: Number of pending orders containing the vendor's products
      const pendingOrders = await Order.count({
        include: [{
          model: OrderItem,
          where: { productId: { [Op.in]: productIds } },
          required: true
        }],
        where: {
          orderStatus: 'Pending'
        }
      });
      // Total Products
      const totalProducts = await countProducts({ ownerId: vendorId });

      // Low Stock Counts
      const lowStockCounts = await countProducts({
        ownerId: vendorId,
        stock: {
          [Op.lt]: maxQuantity
        }
      });
      // Customer Reviews Count
      const customerReviewsCount = await countReviews(vendorId);

      // Calculate sum of current_amount for completed Credit transactions
      const result = await WalletHistory.sum('currentAmount', {
        where: {
          vendorId,
          status: 'Completed',
          type: 'Credit'
        }
      });

      const totalWalletBalance = result || 0;

      // Response data
      const dashboardData = {
        totalOrders,
        monthlyRevenue,
        pendingOrders,
        totalProducts,
        lowStockCounts,
        customerReviewsCount,
        totalWalletBalance
      };

      return res.status(200).json({
        error: false,
        msg: 'Vendor Dashboard counts fetched successfully',
        data: dashboardData
      });
    } catch (error) {
      console.error('Error fetching dashboard counts:', error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = dashboardApi;

