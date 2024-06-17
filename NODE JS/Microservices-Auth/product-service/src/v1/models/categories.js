const {sequelize, DataTypes} = require("../config/mysql-db");

const Category = sequelize.define(
  "Category", {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'category_id'
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_name'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'parent_category_id'
    },
    categoryImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'category_image'
    },
    categoryStatus: {
      type: DataTypes.ENUM('Active', 'InActive'),
      allowNull: false,
      defaultValue: 'Active',
      field: 'category_status'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    }
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;

