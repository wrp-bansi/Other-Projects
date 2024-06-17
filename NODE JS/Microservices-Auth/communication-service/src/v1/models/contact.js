const { sequelize, DataTypes } = require("../config/mysql-db");

const Contact = sequelize.define(
  "contacts", {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "contact_id"
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email"
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "mobile"
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "subject"
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "message"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "updated_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    }
  }, {
    tableName: "contacts",
    timestamps: false
  }
);

module.exports = Contact;
