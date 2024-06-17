const { sequelize, DataTypes } = require("../config/mysql-db");
const Product = require("./product");

const Enquiry = sequelize.define('Enquiry', {
  enquiryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'enquiry_id'
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  enquirerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'enquirer_name'
  },
  enquirerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'enquirer_email'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Resolved', 'Closed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
    get() {
      return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    onUpdate: DataTypes.NOW,
    field: 'updated_at',
    get() {
      return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
    }
  }
}, {
  tableName: 'enquiries',
  timestamps: false
});

Enquiry.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Enquiry;
