const { sequelize, DataTypes } = require("../config/mysql-db");
const PostsCategory = require("./postsCategory");
const PostTypes = require("./postsTypes");

const Posts = sequelize.define(
  "posts", {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "post_id"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "post_category_id",
      references: {
        model: PostsCategory,
        key: 'postCategoryId'
      },
    },
    postTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "post_type_id",
      references: {
        model: PostTypes,
        key: 'postTypeId'
      },
    },
    postImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "post_image"
    },
    postStatus: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft',
      field: "post_status"
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "publication_date",
    },
    metaTitle: {
      type: DataTypes.STRING,
      field: "meta_title"
    },
    metaDescription: {
      type: DataTypes.TEXT,
      field: "meta_description"
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      field: "meta_keywords"
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    tableName: "posts",
    timestamps: false
  }
);


Posts.belongsTo(PostsCategory, { foreignKey: 'postCategoryId' });
Posts.belongsTo(PostTypes, { foreignKey: 'postTypeId' });


module.exports = Posts;
