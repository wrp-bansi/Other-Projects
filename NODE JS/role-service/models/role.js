const { sequelize, DataTypes } = require("../config/mysql-db");

const Role = sequelize.define(
  "role",
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "role_id",
    },
    name: {
      type: DataTypes.STRING(256),
      // allowNull: false,
    },
    permission: {
      // text type and store multypule permission Id
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        if (this.getDataValue("permission") == "" || this.getDataValue("permission") == undefined) {
          return [];
        }
        return this.getDataValue("permission").split(",");
      },
      set(val) {
        if (val == "" || val == undefined) {
          this.setDataValue("permission", "");
        } else {
          this.setDataValue("permission", val.join(","));
        }
      },
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
    tableName: "role",
    timestamps: false,
  }
);

module.exports = Role;
