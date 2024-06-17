const { sequelize, DataTypes } = require('../config/mysql-db');

const UserRole = sequelize.define(
  'user_role',
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'role_id',
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('createdAt'), 'Y-m-d H:i:s');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('updatedAt'), 'Y-m-d H:i:s');
      },
    },
  },
  {
    sequelize,
    tableName: 'user_roles',
    timestamps: false,
  },
);

module.exports = UserRole;
