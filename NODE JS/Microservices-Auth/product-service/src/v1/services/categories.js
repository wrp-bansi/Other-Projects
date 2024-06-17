const Category = require("../models/categories");
const dotenv = require('dotenv');
const Product = require("../models/product");
dotenv.config()

// Get All Categories with Pagination
async function getCategorywithpagination(whereParams, otherdata) {
  const data = await Category.findAndCountAll({
    ...whereParams,
    ...otherdata
  });

  if (!data) {
    // If no data is found, return an object with count = 0 and empty rows array
    return { count: 0, rows: [] };
  }

  return data;
}

// Get Categories Count
async function getCategoryCount(whereClause) {
  const count = await Category.count({where: whereClause});
  return count;
}

async function getAllCategory(whereParams) {
  const data = await Category.findAll({where: whereParams});

  return data;
}

// Get Sub item of Categories
async function getSubItems() {

  const subItems = await Category.findAll({
    attributes: ["categoryId", "categoryName", "parentCategoryId", "categoryStatus", "categoryImage"],
  });
  return subItems;
}

// Create Category
async function createCategory(categoryData) {
  const category = await Category.create(categoryData);
  if (category) {
    return category;
  } else {
    throw new Error("category not created");
  }
}

// Get One Category
async function getOneCategory(whereParams) {
  const category = await Category.findOne({where: whereParams});
  return category;
}

const getCategoryWithProductsById = async (categoryId) => {
  try {
    // Fetch category by ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return null; // Return null if category is not found
    }

    // Fetch associated products for the category
    const products = await Product.findAll({
      where: { categoryId: categoryId }
    });

    return { category: category, products: products };
  } catch (error) {
    // Handle errors
    console.error(`Error fetching category with products for category ID ${categoryId}:`, error);
    throw error;
  }
};
// Update Category
async function updateCategory(updateParams, categoryData) {
  // Check if the category exists
  const existingCategory = await getOneCategory(updateParams);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Category exists, proceed with the update
  await existingCategory.update(categoryData);

  // Return the updated category
  return existingCategory;
}

// Delete Category
async function deleteCategory(whereParams) {
  const data = await Category.destroy({where: whereParams})
  if (data === 0) {
    throw new Error("Category not found");
  }
  return {msg: "Category deleted successfully"};
}

// Move Images and Docs
const moveImagesAndDoc = async (files, folderName) => {
  try {
    // Define the method, URL, body, and headers for the microservice request
    const method = 'POST';
    const url = process.env.MOVE_IMAGE_URL;
    const body = {files, folderName};
    const headers = {'Content-Type': 'application/json'};

    // Call the microservice API using callMicroServiceApi function
    const response = await global.common.callMicroServiceApi(method, url, body, headers);


    // Extract the final paths from the response
    const finalPaths = response.finalPaths;

    // Return the final paths
    return finalPaths;

  } catch (error) {
    console.error("Error occurred while moving category images and docs:", error);
    throw error;
  }
}

module.exports = {getAllCategory, getSubItems, createCategory, updateCategory, deleteCategory, getCategorywithpagination, moveImagesAndDoc, getCategoryCount,getOneCategory,getCategoryWithProductsById};

