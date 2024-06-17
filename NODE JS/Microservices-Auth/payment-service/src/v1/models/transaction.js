const { sequelize, DataTypes } = require("../config/mysql-db");
const Order = require("../../../../order-service/src/v1/models/order");
const PaymentGateway = require("../models/paymentGateway");
const Users = require("../../../../users-service/src/v1/models/users");

const Transaction = sequelize.define(
  "Transaction", {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "transaction_id"
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'order_id'
      },
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
    paymentGatewayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentGateway,
        key: 'payment_gateway_id'
      },
      field: 'payment_gateway_id'
    },
    transactionAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "transaction_amount"
    },
    transactionDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "transaction_details",
      get() {
        const details = this.getDataValue("transactionDetails");
        return details ? JSON.parse(details) : null;
      },
      set(value) {
        this.setDataValue("transactionDetails", value ? JSON.stringify(value) : null);
      }
    },
    transactionStatus: {
      type: DataTypes.ENUM('Pending', 'Success', 'Failed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
      field: "transaction_status"
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "transaction_date",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("transactionDate"), 'Y-m-d H:i:s');
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    },
  }, {
    tableName: "transactions",
    timestamps: false
  }
);

module.exports = Transaction;
