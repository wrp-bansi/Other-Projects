// OrderItem Model
const { sequelize, DataTypes } = require("../config/mysql-db");
const Product = require("../../../../product-service/src/v1/models/product");
const Order = require("./order");

const OrderItem = sequelize.define('OrderItem', {
  orderItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'order_item_id'
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'product_id'
    },
    field: 'product_id'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'unit_price'
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
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
      return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d ');
    }
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
};

module.exports = OrderItem;
