
const { getDataFromCache, invalidateCache } = require("../helpers/chche-helper");
const {getAllPostsCategory, getOnePostsCategory, createPostsCategory, updatePostsCategory, deletePostsCategory, getPostsCategorywithpagination, updatePostsCategorywithSlug} = require("../services/postsCategory");
const {Op} = require("sequelize");

const postCategoryApi = {

  //Get All Posts Category without pagination
  getAllPostsCategory: async (req, res) => {
    try {
      const data = await getDataFromCache("allPostsCategory");
      res.status(200).json({error: false, msg: "Show all Posts Category successfully", data:{rows:data}});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Get One Posts Category
  getPostCategoryById: async (req, res) => {
    const {postCategoryId} = req.params
    try {
      const postcategory = await getOnePostsCategory({postCategoryId: postCategoryId});
      res.status(200).json({error: false, msg: "Posts Category found successfully", data: postcategory});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Create Posts Category
  createPostCategory: async (req, res) => {
    const {name, parentId, categoryImage, categoryStatus, metaTitle, metaDescription, metaKeywords} = req.body;
    const postCategoryData = {name, parentId, categoryImage, categoryStatus, metaTitle, metaDescription, metaKeywords}
    try {
      await createPostsCategory(postCategoryData);
      // Inside the deleteCategory function
      await invalidateCache();
      res.status(200).json({error: false, msg: "Posts Category created successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Update Posts Category
  updatePostCategory: async (req, res) => {
    const {postCategoryId} = req.params
    const postCategoryData = req.body;
    try {
      await updatePostsCategorywithSlug({postCategoryId: postCategoryId}, postCategoryData);
      await invalidateCache();
      res.status(200).json({error: false, msg: "Posts Category updated successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  // Update Posts Category Status
  updatePostCategoryStatus: async (req, res) => {
    const { postCategoryId } = req.params;
    const {categoryStatus} = req.body;
    try {
      await updatePostsCategory({ postCategoryId: postCategoryId },{ categoryStatus: categoryStatus });
      await invalidateCache();
      res.status(200).json({ error: false, msg: "Posts Category status updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Posts Category
  deletePostCategory: async (req, res) => {
    const {postCategoryId} = req.params
    try {
      await deletePostsCategory({postCategoryId: postCategoryId});
      await invalidateCache();
      res.status(200).json({error: false, msg: "Posts category deleted successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Get All Posts Category with pagination
  getPostCategoryWithPagination: async (req, res) => {
    try {
      const {orderBy = "postCategoryId", order = "DESC", search = "", filter = {}, isDownload = false} = req.query;
      const {offset, perPage, currentPage} = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = {...filter};
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            name: {[Op.like]: `%${search}%`},
            categoryStatus: {[Op.like]: `%${search}%`},
          },
        };
      }

      // Get Posts Category with pagination and apply filter
      const data = await getPostsCategorywithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allPostCategory = await getAllPostsCategory(whereClause);
        responseData = {error: false, msg: "Show All Post Category", data: {rows:allPostCategory}};
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Posts Category with Pagination",
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
      console.error("Error occurred while fetching posts:", error);
      return res.status(400).send({error: true, msg: error.message});
    }
  },

  //Bulk-Delete Posts Category
  bulkDeletePostsCategory: async (req, res) => {
    const {postCategoryIds} = req.body; // Assuming an array of post IDs is sent in the request body
    try {
      // Perform bulk delete
      await deletePostsCategory({postCategoryId: {[Op.in]: postCategoryIds}});
      await invalidateCache();
      res.status(200).json({error: false, msg: "Posts Category deleted successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

}

module.exports = postCategoryApi;
