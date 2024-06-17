const { sequelize, DataTypes } = require("../config/mysql-db");


const Setting = sequelize.define(
  "settings", {
    settingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "setting_id"
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEditable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_editable"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active"
    },
    fieldType: {
      type: DataTypes.ENUM('input', 'select'),
      allowNull: false,
      defaultValue: 'input',
      field:'field_type'
    },
    fieldOptions: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'field_options',
      get() {
        if (this.fieldType === 'select') {
          return this.getDataValue('fieldOptions') || 'true,false';
        } else {
          return null; // Return null for other fieldTypes
        }
      },
      set(value) {
        if (this.fieldType === 'select') {
          // Check if the value is a comma-separated list of options
          const options = value.split(',');
          const validOptions = ['true', 'false', 'male', 'female', 'usd', 'jpy', 'gbp', 'eur'];
          const isValid = options.every(option => validOptions.includes(option.trim().toLowerCase()));
          if (isValid) {
            // Store the value if all options are valid
            this.setDataValue('fieldOptions', value);

          } else {
            // Throw an error if any option is invalid
            throw new Error('Invalid fieldOptions for fieldType select. Must be a comma-separated list of options: "true", "false", "male", "female", "USD", "JPY", "GBP", "EUR".');
          }
        } else if (value !== undefined && value !== null) {
          // If fieldOptions is provided for a fieldType other than select, throw an error
          throw new Error('Field options are only allowed for fieldType select.');
        }
      }
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
    tableName: "settings",
    timestamps: false
  }
);


module.exports = Setting;
