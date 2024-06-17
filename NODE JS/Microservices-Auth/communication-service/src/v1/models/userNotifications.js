const { sequelize, DataTypes } = require("../config/mysql-db");

const UserNotification = sequelize.define(
  "user_notifications", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "message"
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image"
    },
    redirectType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "redirect_type"
    },
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "reference_id"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unread',
      field: "status"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at",
      get() {
        return global.datetime.formatCreationTime(this.getDataValue("createdAt"));
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "updated_at",
      get() {
        return global.datetime.formatCreationTime(this.getDataValue("updatedAt"));
      }
    }
  }, {
    tableName: "user_notifications",
    timestamps: false
  }
);

module.exports = UserNotification;
