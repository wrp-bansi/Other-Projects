const { sequelize, DataTypes } = require('../config/mysql-db');

const Role = sequelize.define(
  'role',
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'role_id',
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
        if (this.getDataValue('permission') === '' || this.getDataValue('permission') === undefined) {
          return [];
        }
        return this.getDataValue('permission').split(',');
      },
      set(val) {
        if (val === '' || val ===undefined) {
          this.setDataValue('permission', '');
        } else {
          this.setDataValue('permission', val.join(','));
        }
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('createdAt'), 'Y-m-d H:i:s');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue('updatedAt'), 'Y-m-d H:i:s');
      },
    },
  },
  {
    sequelize,
    tableName: 'role',
    timestamps: false,
  },
);

module.exports = Role;
