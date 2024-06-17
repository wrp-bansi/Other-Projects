const {sequelize, DataTypes} = require("../config/mysql-db");

const devices = sequelize.define(
  "user_device",
  {
    userDeviceId: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      field: "user_device_id",
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "user_id",
    },
    deviceId: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      field: "device_id",
    },
    deviceName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
      field: "device_name",
    },
    deviceType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0: Android, 1: iOS',
      field: "device_type",
    },
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive',
      field: "is_active",
    },
    firebaseToken: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      field: "firebase_token",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = devices;
