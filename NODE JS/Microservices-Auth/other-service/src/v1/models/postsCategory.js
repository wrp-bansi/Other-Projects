const { sequelize, DataTypes } = require("../config/mysql-db");


const PostsCategory = sequelize.define(
  "post_category", {
    postCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "post_category_id"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: "parent_id"
    },
    categoryImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "category_image"
    },
    categoryStatus: {
      type: DataTypes.ENUM('Active', 'InActive'),
      allowNull: false,
      defaultValue: 'Active',
      field: "category_status"
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "meta_title"
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "meta_description"
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "meta_keywords"
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
    },
  }, {
    tableName: "post_category",
    timestamps: false
  }
);

// Define self-referential association for parent-child relationship
PostsCategory.hasMany(PostsCategory, { as: 'children', foreignKey: 'parentId' });
PostsCategory.belongsTo(PostsCategory, { as: 'parent', foreignKey: 'parentId' });

module.exports = PostsCategory;
