const { sequelize, DataTypes } = require("../config/mysql-db");
const Users = require("../../../../users-service/src/v1/models/users");

const WalletHistory = sequelize.define(
  "WalletHistory", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'userId'
      },
      field: 'vendor_id'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'order_id'
    },
    type: {
      type: DataTypes.ENUM('Credit', 'Debit'),
      allowNull: false
    },
    previousAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'previous_amount'
    },
    currentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'current_amount'
    },
    status: {
      type: DataTypes.ENUM('Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Completed'
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
    tableName: "wallet_history",
    timestamps: false
  }
);

module.exports = WalletHistory;
