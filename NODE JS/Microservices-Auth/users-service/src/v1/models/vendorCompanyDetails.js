const { sequelize, DataTypes } = require("../config/mysql-db");
const Users = require("./users");

const VendorCompanyDetails = sequelize.define(
  "VendorCompanyDetails",
  {
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "company_id",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "user_id",
      },
    },
    companyName: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: "company_name",
    },
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "company_address",
    },
    companyEmail: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: "company_email",
    },
    companyPhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "company_phone_number",
    },
    companyLogo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "company_logo",
    },
    vendorCommission: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      field: "vendor_commission",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), "Y-m-d H:i:s");
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      field: "updated_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), "Y-m-d H:i:s");
      },
    },
  },
  {
    sequelize,
    tableName: "vendor_company_details",
    timestamps: false,
  }
);

VendorCompanyDetails.belongsTo(Users, { foreignKey: 'userId', as: 'userDetails' });
module.exports = VendorCompanyDetails;
