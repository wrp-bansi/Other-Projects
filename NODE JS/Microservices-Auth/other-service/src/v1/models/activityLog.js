const { sequelize, DataTypes } = require("../config/mysql-db");

// Define enum for activity types
const ActivityTypes = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER_STATUS: 'update_order_status',
  UPDATE_PASSWORD: 'update_password',
  // Add more activity types as needed
};

const ActivityLog = sequelize.define(
  "activity_logs", {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "log_id"
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "table_name"
    },
    activityType: {
      type: DataTypes.ENUM(Object.values(ActivityTypes)),
      allowNull: false,
      field: "activity_type"
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "timestamp"
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const details = this.getDataValue("details");
        try {
          return details ? JSON.parse(details) : null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
        }
      },
      set(value) {
        this.setDataValue("details", value ? JSON.stringify(value) : null);
      }
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    },
  }, {
    tableName: "activity_logs",
    timestamps: false
  }
);

module.exports = ActivityLog;
