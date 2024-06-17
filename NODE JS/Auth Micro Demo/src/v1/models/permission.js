const { sequelize, DataTypes } = require("../config/mysql-db");

const Permission = sequelize.define("permission",
  {
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "permission_id",
    },
    name: {
      type: DataTypes.STRING(256),
      // allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      // allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "permission",
    timestamps: false,
  }
);

module.exports = Permission;
