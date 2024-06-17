const { sequelize, DataTypes } = require("../config/mysql-db");

const Brand = sequelize.define('Brand', {
  brandId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'brand_id'
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'brand_name'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description'
  },
  logoUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'logo_url'
  },
  status: {
    type: DataTypes.ENUM('Active', 'InActive'),
    allowNull: false,
    defaultValue: 'Active',
    field: 'status'
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
  }
}, {
  tableName: 'brands',
  timestamps: false
});

module.exports = Brand;
