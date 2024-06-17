const {sequelize, DataTypes} = require("../config/mysql-db");
const Brand = require("./brand");
const Category = require("./categories");


const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'product_id'
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'product_name'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  regularPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'regular_price'
  },
  salePrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'sale_price'
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'stock'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'categoryId'
    },
    field: 'category_id'
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Brand,
      key: 'brandId'
    },
    field: 'brand_id'
  },
  SKU: {
    type: DataTypes.STRING,
    allowNull: true
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productImage: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'product_image'
  },
  productStatus: {
    type: DataTypes.ENUM('Active', 'InActive'),
    allowNull: false,
    defaultValue: 'Active',
    field: 'product_status'
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  optionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'optional_notes'
  },
  ownerId: { // New field to replace userId
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'owner_id'
  },
  type: {
    type: DataTypes.ENUM('admin', 'vendor'),
    allowNull: false,
    defaultValue: 'vendor'
  },
  averageRating: {
    type: DataTypes.FLOAT, // Assuming average rating is a floating point number
    allowNull: true,
    field: 'average_rating'
  },
  isEnquiry: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_enquiry'
  },
  totalQuantitySold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: 'total_quantity_sold'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
    get() {
      return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d');
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    onUpdate: DataTypes.NOW,
    field: 'updated_at',
    get() {
      return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d');
    }
  }
}, {
  tableName: 'products',
  timestamps: false
});
Product.belongsTo(Category, {foreignKey: 'categoryId', as: 'category'});
Product.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });


module.exports = Product;
