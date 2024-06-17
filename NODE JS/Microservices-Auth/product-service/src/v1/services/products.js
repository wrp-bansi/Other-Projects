const Product = require("../models/product");
const Category = require("../models/categories");
const { sequelize } = require("../config/mysql-db");
const Brand = require("../models/brand");

// Get All Products with Pagination
async function getProductwithpagination(whereParams) {
  const data = await Product.findAndCountAll(whereParams);

  // If no Products found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

// Get All Products without Pagination
async function getAllProducts(whereParams) {
  const data = await Product.findAll(whereParams );
  return data;
}

// Get One Product
async function getOneProduct(whereParams) {
  const data = await Product.findOne({where: whereParams,
    include: [
      { model: Category, as: 'category', attributes: ['categoryName'] },
      { model: Brand, as: 'brand', attributes: ['brandName'] }
    ]
  });
  if (!data) throw new Error("Product not found");
  return data;
}

// Create Product
async function createProduct(productData) {
  const product = await Product.create(productData);
  if (product) {
    return product;
  } else {
    throw new Error("product not created");
  }

}

// Update Product
async function updateProduct(updateParams, productData) {
  // Check if the Product exists
  const existingProduct = await getOneProduct(updateParams);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // Product exists, proceed with the update
  await existingProduct.update(productData);

  // Return the updated Product
  return existingProduct;
}

// Delete Product
async function deleteProduct(whereParams) {
  const data = await Product.destroy({where: whereParams})
  if (data === 0) {
    throw new Error("Product not found");
  }
  return {msg: "Product deleted successfully"};
}

async function getOneProductWithCategory(whereParams) {
  const data = await Product.findOne({
    where: whereParams,
    include: [{ model: Category, as: 'category' }]
  });
  if (!data) throw new Error("Product not found");
  return data;
}

// Get all Products Filed
async function getProductKeys() {
  try {
    // Get the attributes of the Product model
    const productKeys = Object.keys(Product.rawAttributes);
    return productKeys;
  } catch (error) {
    throw new Error("Failed to retrieve product keys: " + error.message);
  }
}

// Count all Products
async function countProducts(whereParams) {
  return await Product.count({where: whereParams});
}

// Get Product Price
const getProductPrice = async (productId) => {
  const product = await getOneProduct({ productId });
  if (product.salePrice !== null) {
    return product.salePrice;
  } else if (product.regularPrice !== null) {
    return product.regularPrice;
  } else {
    throw new Error(`No price found for product ${productId}`);
  }
};

// Update Product Quantity
// async function updateProductQuantity(productId, quantity, increment = true, transaction = null) {
//   try {
//     // Retrieve the product
//     const product = await getOneProduct({productId});

//     // Check if product exists
//     if (!product) {
//       throw new Error(`Product with ID ${productId} not found`);
//     }

//     // Update the quantity based on the operation (increment or decrement)
//     if (increment) {
//       product.quantity += quantity;
//     } else {
//       product.quantity -= quantity;
//       // Ensure the quantity does not go below 0
//       if (product.quantity < 0) {
//         product.quantity = 0;
//       }
//     }

//     // Save the changes
//     if (transaction) {
//       await updateProduct({productId}, {quantity: product.quantity}, {transaction});
//     } else {
//       await updateProduct({productId}, {quantity: product.quantity});
//     }

//     // Return the updated product
//     return product;
//   } catch (error) {
//     throw new Error(`Error updating product quantity: ${error.message}`);
//   }
// }

async function updateProductQuantity(productId, stock, increment = true, transaction = null) {
  let t; // Local transaction variable
  try {
    if (transaction) {
      t = transaction; // Use the provided transaction
    } else {
      t = await sequelize.transaction(); // Create a new transaction if not provided
    }

    // Retrieve the product
    const product = await getOneProduct({ productId });

    // Check if product exists
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Update the stock based on the operation (increment or decrement)
    if (increment) {
      product.stock += stock;
    } else {
      product.stock -= stock;
      // Ensure the stock does not go below 0
      if (product.stock < 0) {
        product.stock = 0;
      }
    }

    // Save the changes within the transaction
    await updateProduct({ productId }, { stock: product.stock }, { transaction: t });

    // If the transaction was not provided from outside, commit it
    if (!transaction) {
      await t.commit();
    }

    // Return the updated product
    return product;
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (!transaction && t) {
      await t.rollback();
    }
    throw new Error(`Error updating product stock: ${error.message}`);
  }
}


module.exports = {getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, getProductwithpagination, getOneProductWithCategory, getProductKeys, countProducts, getProductPrice, updateProductQuantity};
