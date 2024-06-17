const { sequelize, DataTypes } = require('../config/mysql-db')

const Otps = sequelize.define(
  'otps',
  {
    otp_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    device_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    generated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)

module.exports = Otps
