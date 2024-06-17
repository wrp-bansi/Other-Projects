/* eslint-disable prefer-const */
const {getAllCategory, getSubItems, createCategory, updateCategory, deleteCategory,moveImagesAndDoc, getOneCategory, getCategorywithpagination, getCategoryWithProductsById} = require("../services/categories");
const logger = require("../helpers/logger-helper");
const {Op} = require("sequelize");
const path = require('path');
const { getDataFromCache, invalidateCache } = require("../helpers/chche-helper");

const categoriesApi = {

  // Get All Categories without Pagination
  getCategory: async (req, res) => {
    try {
      const data = await getDataFromCache("getAllparentCategories");
      const subItems = await getSubItems();

      const mergedData = data.map((item) => {
        const children = subItems
          .filter((subItem) => subItem.parentCategoryId === item.categoryId)
          .map((child) => ({
            parentCategoryId: child.parentCategoryId,
            categoryId: child.categoryId,
            categoryName: child.categoryName,
            categoryStatus: child.categoryStatus,
            categoryImage: child.categoryImage
          }));
        return {
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          parentCategoryId: item.parentCategoryId,
          categoryStatus: item.categoryStatus,
          categoryImage: item.categoryImage,
          children: children.length > 0 ? children : []

        };
      });

      if (!data) {
        return res
          .status(200)
          .json({error: true, msg: "Category Not found"});
      }
      return res
        .status(200)
        .json({error: false, msg: "Show all Categories", data:{rows: mergedData}});
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .json({error: true, msg: error.message});
    }
  },

  // Get All Categories with Pagination
  getAllCategorieswithPagination: async (req, res) => {
    try {
      const { orderBy = "categoryId", order = "DESC", search = "", filter = {}, isDownload = false, isCategory = "" } = req.query;
      const { offset, perPage } = global.common.getPaginationParams(req.query);

      let categoriesWithProducts;
      const categoryIdArray = isCategory ? isCategory.split(',').map(Number) : [];

      if (isDownload === 'true') {
        // Fetch all categories with their products
        const categories = await getAllCategory();
        categoriesWithProducts = [];

        for (const category of categories) {
          const categoryWithProducts = await getCategoryWithProductsById(category.categoryId);
          categoriesWithProducts.push(categoryWithProducts);
        }
        // Filter categories if isCategory is provided and not "0"
        if (categoryIdArray.length > 0) {
          categoriesWithProducts = categoriesWithProducts.filter(category => categoryIdArray.includes(category.category.categoryId));
        }
        // Send the response
        res.status(200).json({
          error: false,
          msg: "Category with Products Fetched successfully",
          data: categoriesWithProducts
        });
      } else {
        const whereClause = {
          ...filter,
          [Op.or]: {
            categoryName: { [Op.like]: `%${search}%` },
            description: { [Op.like]: `%${search}%` },
            categoryStatus: { [Op.like]: `%${search}%` },
          },
        };
        if (categoryIdArray.length > 0) {
          whereClause.categoryId = {
            [Op.in]: categoryIdArray
          };
        }


        // Fetch paginated categories with their products
        const { rows: categories, count } = await getCategorywithpagination({
          where: whereClause,
          offset,
          limit: perPage,
          order: [[orderBy, order]],
        });

        categoriesWithProducts = [];

        // Fetch associated products for each category
        for (const category of categories) {
          const categoryWithProducts = await getCategoryWithProductsById(category.categoryId);
          categoriesWithProducts.push(categoryWithProducts);
        }

        // Filter categories if categoryIdArray is provided
        if (categoryIdArray.length > 0) {
          categoriesWithProducts = categoriesWithProducts.filter(category => categoryIdArray.includes(category.category.categoryId));
        }

        // Calculate total pages
        const totalPages = Math.ceil(count / perPage);

        // Send the response with pagination details
        res.status(200).json({
          error: false,
          msg: "Category with Products Fetched successfully",
          data: {
            count,
            rows: categoriesWithProducts,
            perPage,
            currentPage: Math.floor(offset / perPage) + 1,
            totalPages
          }
        });
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching categories with products:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get One Category
  getCategoryById: async (req, res) => {
    const {categoryId} = req.params;
    try {
      const category = await getOneCategory({ categoryId });
      if (!category) {
        return res.status(404).json({ error: true, msg: "Category not found" });
      }

      // Fetch sub items
      const subItems = await getSubItems();

      // Filter sub items related to the category
      const children = subItems
        .filter((subItem) => subItem.parentCategoryId === category.categoryId)
        .map((child) => child.categoryName);

      // Construct response object
      const mergedData = {
        parent: {
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          parentCategoryId: category.parentCategoryId,
          categoryStatus: category.categoryStatus,
          children: children.length > 0 ? children : null,
        },
      };

      return res
        .status(200)
        .send({error: false, msg: "Show Category by id", data: mergedData});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

  // Get parent Category
  getParentCategories: async (req, res) => {
    try {
      const data = await getAllCategory({parentCategoryId:0});
      return res
        .status(200)
        .json({error: false, msg: "Show Parent Categories", data:{rows: data}});
    } catch (error) {
      logger.error(error);
      return res
        .status(400)
        .json({msg: error.message});
    }
  },

  // Create Category
  createCategory: async (req, res) => {
    const {categoryName, parentCategoryId, description, categoryImage, categoryStatus} = req.body;
    let categoryImageData = categoryImage;

    // Check if categoryImage is provided
    if (categoryImageData) {
      if (Array.isArray(categoryImage)) {
        categoryImageData = categoryImage.join(',');
      }

      try {
        // Move category images
        const finalPaths = await moveImagesAndDoc(categoryImage, 'categories');
        if(!finalPaths){
          throw new Error("images not found")
        }

        // Map file paths to relative paths
        const formattedPaths = finalPaths.map(filePath => {
          const fileName = path.basename(filePath);
          return path.posix.join('uploads', 'categories', fileName);
        });

        // Update categoryData with formatted image paths
        categoryImageData = formattedPaths.join(',');
      } catch (error) {
        return res.status(400).json({error: true, msg: error.message});
      }
    }

    const categoryData = {
      categoryName,
      parentCategoryId,
      description,
      categoryImage: categoryImageData,
      categoryStatus
    };

    try {
      // Save categoryData to the database
      const createdCategory = await createCategory(categoryData); // Adjust this line according to your database model

      await invalidateCache();

      res.status(200).json({error: false, msg: 'category created successfully', data: createdCategory});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Update Category
  updateCategory: async (req, res) => {
    const {categoryId} = req.params;
    const categoryData = req.body;

    try {
      // Initialize imageData
      let imageData = null;

      // If categoryImage exists and it's not null, move images and update category data
      if (categoryData.categoryImage) {
        // Join category images if it's an array
        imageData = Array.isArray(categoryData.categoryImage) ? categoryData.categoryImage.join(',') : categoryData.categoryImage;

        // Move category images
        const imagePath = await moveImagesAndDoc(categoryData.categoryImage, 'categories');
        if(!imagePath){
          throw new Error("images not found")
        }

        // Update categoryData with formatted image paths
        imageData = imagePath.map(filePath => {
          const fileName = path.basename(filePath);
          return "\\" + path.join('uploads', 'categories', fileName);
        }).join(',');
      }

      // Update category data with imageData if it exists
      const updatedCategoryData = imageData
        ? {...categoryData, categoryImage: imageData}
        : categoryData;

      // Update the category without forcing the image update
      const data = await updateCategory({categoryId: categoryId}, updatedCategoryData);
      await invalidateCache();
      res.status(200).send({error: false, msg: "Category updated successfully", data});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

  // Delete Category
  deleteCategory: async (req, res) => {
    const {categoryId} = req.params;
    try {
      await deleteCategory({categoryId: categoryId})
      await invalidateCache();
      res
        .status(200)
        .send({error: false, msg: "Category deleted successfully"});
    } catch (error) {
      logger.error(error);
      res.status(400).send({error: true, msg: error.message});
    }
  },

  // Update Category Status
  updateCategoryStatus: async (req, res) => {
    try {
      const {categoryId} = req.params;
      const {categoryStatus} = req.body;
      const updateCategoryStatus = await updateCategory({categoryId: categoryId}, {categoryStatus: categoryStatus});
      await invalidateCache();
      return res.status(200).json({error: false, msg: 'Category status updated successfully', data: updateCategoryStatus});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: true, msg: error.message});
    }
  },

  // Bulk-Delete Categories
  bulkDeleteCategories: async (req, res) => {
    try {
      const {categoryIds} = req.body;

      // Perform bulk delete operation
      await deleteCategory({categoryId: {[Op.in]: categoryIds}});
      await invalidateCache();
      // Return success response
      return res.status(200).json({error: false, msg: "Categories deleted successfully"});
    } catch (error) {
      return res.status(400).json({error: true, msg: error.message});
    }
  }

};

module.exports = categoriesApi;
