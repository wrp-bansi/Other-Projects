const { sequelize, DataTypes } = require('../config/mysql-db');
const Users = require('./users');
const Product=require('../../../../product-service/src/v1/models/product')

const Wishlist = sequelize.define(
  'wish_list',
  {
    wishlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'wishlist_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: Users,
        key: 'userId'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      references: {
        model: Product,
        key: 'productId'
      }
    },
    addedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'added_date',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('addedDate'), 'Y-m-d H:i:s');
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('createdAt'), 'Y-m-d H:i:s');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('updatedAt'), 'Y-m-d H:i:s');
      },
    },
  },
  {
    sequelize,
    tableName: 'wish_lists',
    timestamps: false,
  }
);

module.exports = Wishlist;
