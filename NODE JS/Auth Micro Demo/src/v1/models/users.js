const { sequelize, DataTypes } = require("../config/mysql-db");

const Users = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "user_id",
    },
    firstName: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      field: "last_name",
    },
    mobile: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "email_verified",
    },
    mpin: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    registerAtIp: {
      type: DataTypes.STRING(20),
      defaultValue: null,
      field: "register_at_ip",
    },
    emailVerificationCode: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "email_verification_code",
    },
    emailExpiryAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "email_expiry_at",
    },
    socialLogins: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: "social_logins",
    },
    token: {
      type: DataTypes.STRING(500),
      defaultValue: null,
    },
    tokenGeneratedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "token_generated_at",
    },
    tokenExpireAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "token_expire_at",
    },
    xApiKey: {
      type: DataTypes.STRING(50),
      defaultValue: null,
      field: "x_api_key",
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "last_login_at",
    },
    emailUpdatedAt: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: "email_updated_at",
    },
    passwordUpdatedAt: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: "password_updated_at",
    },
    userStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // 0:Active, 1:InActive, 2:Banned
      field: "user_status",
    },
    bannedReason: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "banned_reason",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updated_at",
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

Users.__factory = { autoIncrementField: "user_id" };
Users.user_id = "";

module.exports = Users;
