const {sequelize, DataTypes} = require("../config/mysql-db");
const UserRole = require("./userRole");


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
      type: DataTypes.ENUM('Active', 'Unverified', 'Banned'), // Added 'Unverified' status
      allowNull: false,
      get() {
        return this.getDataValue('userStatus') || (this.roleId === 1 ? 'Unverified' : 'Active');
      },
      field: 'user_status',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserRole,
        key: 'roleId',
      },
      field: 'role_id',
    },
    walletBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      allowNull: false,
      field: "wallet_balance",
    },
    bannedReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "banned_reason",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updated_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    },
  },
  {
    sequelize,
    timestamps: false
  }
);

// Define associations
Users.belongsTo(UserRole, { foreignKey: 'roleId', as: 'role' });

module.exports = Users;
