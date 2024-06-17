const Brand = require('../models/brand');
const Product = require('../models/product');

// Get Brand Items with Pagination
async function getBrandWithPagination(whereParams, otherdata) {
  const data = await Brand.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no brands found, return an empty result
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

const getBrandWithProductsById = async (brandId) => {
  try {

    const brand = await Brand.findByPk(brandId);

    if (!brand) {
      return null;
    }

    const products = await Product.findAll({
      where: { brandId: brandId }
    });

    return { brand: brand, products: products };
  } catch (error) {
    // Handle errors
    console.error(`Error fetching brand with products for brand ID ${brandId}:`, error);
    throw error;
  }
};

// Get All Brands without Pagination
async function getAllBrands(whereParams) {
  const data = await Brand.findAll(whereParams);
  return data;
}

// Get Single Brand
const getSingleBrand = async (whereParams) => {
  const data = await Brand.findOne({ where: whereParams });
  if (!data) {
    throw new Error('Brand not found');
  }
  return data;
};

// Create Brand
async function createBrand(brandData) {
  const brandCreate = await Brand.create(brandData);
  if (brandCreate) {
    return brandCreate;
  }
  throw new Error('Brand not created');
}

// Update Brand
async function updateBrand(updateParams, updateData) {

  const existingBrand = await getSingleBrand(updateParams);
  if (!existingBrand) {
    throw new Error("Brand not found");
  }
  await existingBrand.update(updateData);
  return existingBrand;

}

// Delete Brand
async function deleteBrand(deleteParams) {
  const data = await Brand.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('Brand not found');
  }
  return { msg: 'Brand deleted successfully' };
}

module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandWithPagination,
  getBrandWithProductsById
};
