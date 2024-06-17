const { sequelize, DataTypes } = require('../config/mysql-db');

const Currency = sequelize.define(
  'currency',
  {
    currencyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'currency_id',
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'currency_code',
    },
    currencyName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'currency_name',
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchangeRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    decimalPlaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2, // Assuming default decimal places is 2
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
    tableName: 'currencies',
    timestamps: false,
  }
);

module.exports = Currency;
