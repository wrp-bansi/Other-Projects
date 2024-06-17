const { sequelize, DataTypes } = require("../config/mysql-db");

const Coupon = sequelize.define('Coupon', {
  couponId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'coupon_id'
  },
  couponCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'coupon_code'
  },
  discountType: {
    type: DataTypes.ENUM('Percentage', 'Fixed'),
    allowNull: false,
    defaultValue: 'Percentage',
    field: 'discount_type'
  },
  discountAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'discount_amount'
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expiry_date',
    get() {
      return global.datetime.changeDateFotmat(this.getDataValue("expiryDate"), 'Y-m-d H:i:s');
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active'
  },
  usageCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'usage_count'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'coupons',
  timestamps: false
});

module.exports = Coupon;
