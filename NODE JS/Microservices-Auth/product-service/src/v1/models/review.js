const Users = require("../../../../users-service/src/v1/models/users");
const { sequelize, DataTypes } = require("../config/mysql-db");
const Product = require("./product");


const Review = sequelize.define(
  "Review",
  {
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "review_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: Users,
        key: 'userId'
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      field: "updated_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    },
  },
  {
    tableName: "reviews",
    timestamps: false,
  }
);

Review.belongsTo(Product, { foreignKey: "productId", as: "product" });


module.exports = Review;
