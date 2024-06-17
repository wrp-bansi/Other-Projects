const {sequelize, DataTypes} = require("../config/mysql-db");

const Dashboard = sequelize.define(
  "Dashboard",
  {
    dashboardId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'dashboard_id'
    },
    todayRegister: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'today_register'
    },
    totalRegister: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_register'
    },
    todayActiveUsers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'today_active_users'
    },
    lastWeekActiveUsers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'last_week_active_users'
    },
    lastMonthActiveUsers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'last_month_active_users'
    },
    totalProducts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_products'
    },
    totalCategories: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_categories'
    },
    totalSubCategories: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_sub_categories'
    },
    todayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'today_order'
    },
    totalOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_order'
    },
    thisWeekOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'this_week_order'
    },
    totalWishlist: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_wishlist'
    },
    totalVendors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_vendors'
    },
    pendingVendorApprovals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'pending_vendor_approvals'
    },
    totalRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      field: 'total_revenue'
    }
  },
  {
    tableName: "dashboard",
    timestamps: false,
  }
);
module.exports = Dashboard;
