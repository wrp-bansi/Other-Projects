
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductwithpagination, getProductKeys, getOneProductWithCategory, getOneProduct} = require("../services/products");
const {Op} = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const {moveImagesAndDoc} = require("../services/categories");
const Category = require("../models/categories");
const Brand = require("../models/brand");


const productApi = {

  // Get All Products with Pagination
  viewAllProductsWithPagination: async (req, res) => {
    try {
      const { orderBy = "productId", order = "DESC", search = "", filter = {}, isDownload = false,isEnquiry = false } = req.query;
      const ownerId = req.user.userId;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter, ownerId };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            productName: { [Op.like]: `%${search}%` },
            description: { [Op.like]: `%${search}%` },
            productStatus: { [Op.like]: `%${search}%` },
          },
        };
      }
      // Add filter for isEnquiry
      if (isEnquiry === 'true') {
        whereClause = { ...whereClause, isEnquiry: true };
      }

      // Get Posts with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
        include: [
          { model: Category, as: 'category', attributes: ['categoryName'] },
          { model: Brand, as: 'brand', attributes: ['brandName'] }
        ]
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({
          where: whereClause,
          include: [
            { model: Category, as: 'category', attributes: ['categoryName'] },
            { model: Brand, as: 'brand', attributes: ['brandName'] }
          ]
        });
        responseData = { error: false, msg: "Show All Products", data: { rows: allProducts } };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Products with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      return res.status(200).json(responseData);

    } catch (error) {
      console.error("Error occurred while fetching products:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get All Products with Pagination
  getAllProductsWithPagination: async (req, res) => {
    try {
      const {orderBy = "productId", order = "DESC", search = "", filter = {}, isDownload = false,isEnquiry = false,ownerId = null} = req.query;
      const {offset, perPage, currentPage} = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = {...filter};
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            productName: {[Op.like]: `%${search}%`},
            description: {[Op.like]: `%${search}%`},
            productStatus: {[Op.like]: `%${search}%`},
          },
        };
      }
      // Add filter for isEnquiry
      if (isEnquiry === 'true') {
        whereClause = { ...whereClause, isEnquiry: true };
      }

      // Add filter for order ID
      if (ownerId) {
        whereClause = { ...whereClause, ownerId };
      }

      // Get Posts with pagination and apply filter
      const data = await getProductwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
        include: [
          { model: Category, as: 'category', attributes: ['categoryName'] },
          { model: Brand, as: 'brand', attributes: ['brandName'] }
        ]
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allProducts = await getAllProducts({
          where: whereClause,
          include: [
            { model: Category, as: 'category', attributes: ['categoryName'] },
            { model: Brand, as: 'brand', attributes: ['brandName'] }
          ]
        });
        responseData = {error: false, msg: "Show All Products", data:{rows: allProducts}};
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Products with Pagination",
          data: {
            count: data.count,
            rows: data.rows,
            perPage,
            currentPage,
            totalPages: Math.ceil(data.count / perPage)
          }
        };
      }

      return res.status(200).json(responseData);

    } catch (error) {
      console.error("Error occurred while fetching products:", error);
      return res.status(400).send({error: true, msg: error.message});
    }
  },

  // Get All Products without Pagination
  getAllProducts: async (req, res) => {
    try {
      const data = await getAllProducts();
      res.status(200).json({error: false, msg: "Show all Products", data:{rows:data}});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Get Product Details with Related Products
  getProductWithRelatedProducts: async (req, res) => {
    try {
      const { productId } = req.params;

      // Fetch product details along with its related category
      const product = await getOneProductWithCategory({ productId });

      const whereParams = {
        where: {
          categoryId: product.category.categoryId,
          productId: { [Op.ne]: productId }
        },
        limit: 10
      };

      const relatedProducts= await getAllProducts(whereParams)

      // Construct response object
      const response = {
        productId: product.productId,
        productName: product.productName,
        description: product.description,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        stock: product.stock,
        productImage:product.productImage,
        averageRating:product.averageRating,

        relatedProducts: relatedProducts.map(relatedProduct => ({
          productId: relatedProduct.productId,
          productName: relatedProduct.productName,
          description: product.description,
          regularPrice: product.regularPrice,
          salePrice: product.salePrice,
          stock: product.stock,
          productImage:product.productImage,
          averageRating:product.averageRating
        }))
      };

      res.status(200).json({ error: false, msg: "Product details with related products", data: response });
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Product
  getProductById: async (req, res) => {
    const {productId} = req.params;
    try {
      const data = await getOneProduct({productId: productId});

      res.status(200).json({error: false, msg: "Show Product by ID", data});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //serch products
  searchProducts: async (req, res) => {
    try {
      const { search } = req.query;
      // Check if search query is empty or not provided
      if (!search) {
        return res.status(400).json({ error: true, msg: "No search text provided" });
      }
      const whereClause = {
        [Op.or]: {
          productName: { [Op.like]: `%${search}%` },
          description: { [Op.like]: `%${search}%` }
        },
      };
      // Perform database search using Sequelize
      const products = await getAllProducts({where: whereClause});
      // Return the search results
      return res.status(200).json({ error: false, msg: "Products search successful", data: products });
    } catch (error) {
      console.error("Error occurred while searching products in database:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Create Product
  createProduct: async (req, res) => {
    const {productName, description, regularPrice,salePrice, stock, categoryId,brandId, SKU, productImage, productStatus, weight, length, width, height, optionalNotes,isEnquiry} = req.body;
    const ownerId = req.user.userId;
    const type = req.user.role === 'admin' ? 'admin' : 'vendor';
    let productImageData = productImage;

    // Check if productImage is provided
    if (productImageData) {
      if (Array.isArray(productImage)) {
        productImageData = productImage.join(',');
      }

      try {
        // Move product images
        const finalPaths = await moveImagesAndDoc(productImage, 'products');
        if(!finalPaths){
          throw new Error("images not found")
        }

        // Map file paths to relative paths
        const formattedPaths = finalPaths.map(filePath => {
          const fileName = path.basename(filePath);
          return path.posix.join('uploads', 'products', fileName);
        });

        // Update productData with formatted image paths
        productImageData = formattedPaths.join(',');
      } catch (error) {
        return res.status(400).json({error: true, msg: error.message});
      }
    }

    const productData = {productName, description, regularPrice,salePrice, stock, categoryId,brandId, SKU, productImage: productImageData, productStatus, weight, length, width, height, optionalNotes,ownerId, type,isEnquiry};

    try {
      // Save productData to the database
      const createdProduct = await createProduct(productData);

      res.status(200).json({error: false, msg: 'Product created successfully', data: createdProduct});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Update Product
  updateProduct: async (req, res) => {
    const {productId} = req.params;
    const productData = req.body;

    try {
      // // Fetch the existing product to check its ownerId
      // const existingProduct = await getOneProduct({ productId });

      // // Determine the ownerId and type based on who is logged in
      // const loggedInOwnerId = req.user.userId

      // // Check if the logged-in user is the owner of the product
      // if (existingProduct.ownerId !== loggedInOwnerId) {
      //   return res.status(403).json({ error: true, msg: 'Unauthorized: You can only update your own products' });
      // }

      // // Ensure that ownerId and type are not changed
      // if (productData.ownerId || productData.type) {
      //   return res.status(400).json({ error: true, msg: 'Cannot update ownerId and type' });
      // }

      // // Remove ownerId and type from the productData to prevent changes
      // delete productData.ownerId;
      // delete productData.type;

      let imageData = null;

      // If productImage exists and it's not null, move images and update product data
      if (productData.productImage && productData.productImage.length > 0) {
        // Join product images if it's an array
        imageData = Array.isArray(productData.productImage) ? productData.productImage.join(',') : productData.productImage;

        // Move product images
        const imagePath = await moveImagesAndDoc(productData.productImage, 'products');
        if(!imagePath){
          throw new Error("images not found")
        }

        // Map file paths to relative paths
        if (imagePath) {
          // Map file paths to relative paths
          imageData = imagePath.map(filePath => {
            const fileName = path.basename(filePath);
            return "\\" + path.join('uploads', 'products', fileName);
          }).join(',');
        }
      }

      // Update the product data in the database
      const updatedProduct = await updateProduct({productId: productId}, {...productData, productImage: imageData});

      res.status(200).json({error: false, msg: 'Product updated successfully', data: updatedProduct});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Delete Product
  deleteProduct: async (req, res) => {
    const {productId} = req.params;
    try {
      await deleteProduct({productId: productId});

      res.status(200).json({error: false, msg: "Product deleted successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Get all Products Filed
  getProductKeys: async (req, res) => {
    try {
      const productKeys = await getProductKeys();
      res.status(200).json({error: false, msg: "Retrieved product keys successfully", data: productKeys});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // bulk import(csv)
  bulkImportProducts: async (req, res) => {
    const { csvFile } = req.body;
    try {
      const method = 'POST';
      const url = process.env.CSV_TO_JSON;
      const headers = {'Content-Type': 'application/json'};

      // Make a request to the upload service to convert CSV to JSON
      const response = await global.common.callMicroServiceApi(method, url,{csvFilePath:csvFile}, headers);
      // Check if the response is valid and contains products
      if (response.error) {
        throw new Error(response.msg);
      }

      // Extract products from the response
      const products = response.products;

      // Create an array to store the created products
      const createdProducts = [];
      // Determine ownerId and type based on the request sender
      const ownerId = req.user.userId;
      const type = req.user.role === 'admin' ? 'admin' : 'vendor';
      // Loop through each product and create/import them
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        // Add ownerId and type to the productData
        productData.ownerId = ownerId;
        productData.type = type;
        // Create the product in the product database
        const createdProduct = await createProduct(productData);

        // Push the created product to the array
        createdProducts.push(createdProduct);
      }

      // Respond with success message and the created products
      res.status(200).json({error: false, msg: 'Products imported successfully', data: createdProducts});
    } catch (error) {

      res.status(400).json({error: true, msg: error.message});
    }
  },

  //update product stastus
  updateProductStatus: async (req, res) => {
    const {productId} = req.params; // Get the productId from the request parameters
    const {productStatus} = req.body; // Get the new status from the request body

    try {
      // // Fetch the existing product to check its ownerId
      // const existingProduct = await getOneProduct({ productId });

      // // Determine the ownerId based on who is logged in
      // const loggedInOwnerId = req.user.userId

      // // Check if the logged-in user is the owner of the product
      // if (existingProduct.ownerId !== loggedInOwnerId) {
      //   return res.status(403).json({ error: true, msg: 'Unauthorized: You can only update the status of your own products' });
      // }
      // Update the product status
      const updatedProductStatus = await updateProduct({productId: productId}, {productStatus: productStatus});

      res.status(200).json({error: false, msg: "Product status updated successfully", data: updatedProductStatus});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Bulk- Delete Product
  bulkDeleteProducts: async (req, res) => {
    try {
      const {productIds} = req.body;
      // Perform bulk delete operation using Op.in operator
      await deleteProduct({productId: {[Op.in]: productIds}});

      // Return success response
      return res.status(200).json({error: false, msg: "Products deleted successfully"});
    } catch (error) {
      return res.status(400).json({error: true, msg: error.message});
    }
  },

  // Get Top Rated Products
  getTopRatedProducts: async (req, res) => {
    try {
      const whereParams = {
        averageRating: { [Op.not]: null } // Exclude products with null average ratings
      };

      // Define orderParams for ordering by averageRating in descending order
      const orderParams = [['averageRating', 'DESC']];

      // Fetch products with pagination, applying filters and ordering
      const topRatedProducts = await getAllProducts({
        where: whereParams,
        limit: 10,
        order: orderParams,
      });

      res.status(200).json({
        error: false,
        msg: "Top rated products retrieved successfully",
        data:{rows: topRatedProducts}
      });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get Recently view products
  getRecentlyViewedProducts : async (req, res) => {
    try {
      const { productIds } = req.body;

      // Fetch the products by IDs
      const products = await getAllProducts({
        productId: productIds,
      });

      // Create a map of products for easy lookup
      const productMap = {};
      products.forEach(product => {
        productMap[product.productId] = product;
      });
      // Arrange products in the same order as productIds
      const arrangedProducts = productIds.reverse().map(id => productMap[id]).filter(Boolean);
      res.status(200).send({
        error: false,
        msg:"Get All Recently Viewed Products",
        data: arrangedProducts,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        msg: error.message
      });
    }
  },

}

module.exports = productApi;
