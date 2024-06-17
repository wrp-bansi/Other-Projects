// Order Model
const { sequelize, DataTypes } = require("../config/mysql-db");
const Users= require("../../../../users-service/src/v1/models/users");
const OrderItem = require("./orderItem");

const Order = sequelize.define(
  "Order", {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'order_id'
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'user_id'
      },
      field: 'customer_id'
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'order_date',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("orderDate"), 'Y-m-d');
      }
    },
    orderAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'order_amount'
    },
    orderStatus: {
      type: DataTypes.ENUM('Pending','Processing','Shipped','Delivered','Cancelled'), // Use ENUM with order status options
      allowNull: false,
      defaultValue: 'Pending',
      field: 'order_status',
      set(value) {
        this.setDataValue('orderStatus', value);
        if (value === 'Delivered') {
          this.setDataValue('deliveryDate', new Date());
        }
      }
    },
    billingName: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      field: "billing_name",
    },
    billingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'billing_address'
    },
    billingEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'billing_email'
    },
    billingMobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'billing_mobile_number'
    },
    // Shipping details
    shippingName: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      field: "shipping_name",
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'shipping_address'
    },
    shippingEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'shipping_email'
    },
    shippingMobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'shipping_mobile_number'
    },
    couponCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'coupon_code'
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'delivery_date',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("deliveryDate"), 'Y-m-d H:i:s');
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d');
      }
    }
  }, {
    tableName: "orders",
    timestamps: false,
  }
);

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
module.exports = Order;
