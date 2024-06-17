const { sequelize, DataTypes } = require("../config/mysql-db");


const PaymentGateway = sequelize.define(
  "PaymentGateway", {
    paymentGatewayId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "payment_gateway_id"
    },
    paymentGatewayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_gateway_name"
    },
    paymentGatewayUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_gateway_url"
    },
    paymentGatewayImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "payment_gateway_image"
    },
    paymentGatewayMode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_gateway_mode"
    },
    keyId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "key_id"
    },
    keySecret: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "key_secret"
    },
    merchantId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "merchant_id"
    },
    merchantKey: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "merchant_key"
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "client_id"
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "client_secret"
    },
    other: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Active", "InActive"), // Assuming two possible values: "active" or "inactive"
      allowNull: false,
      defaultValue: "Active" // You can set the default value according to your requirements
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    tableName: "payment_gateways",
    timestamps: false
  }
);


module.exports = PaymentGateway;
