const { sequelize, DataTypes } = require("../config/mysql-db");

const Admin = sequelize.define(
  "admin",
  {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "admin_id",
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "email_id",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
      field: "last_name",
    },
    mobile: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING(56),
      allowNull: false,
    },
    isSuperAdmin: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: false,
      defaultValue: 'no',
      field: 'is_super_admin',
    },
    xApiKey: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "x_api_key",
    },
    token: {
      type: DataTypes.STRING(500),
      defaultValue: null,
      // allowNull: false,
    },
    tokenExpireAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "token_expire_at",
    },
    tokenGeneratedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "token_generated_at",
    },
    accountStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 2,
      comment: "1: Active, 2: Inactive, 3: Banned",
      field: "account_status",
    },
    emailUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "email_updated_at",
    },
    passwordUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "password_updated_at",
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: "last_login_at",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updated_at",
    },
  },
  {
    tableName: "admins",
    sequelize,
    timestamps: false,
  }
);

module.exports = Admin;
