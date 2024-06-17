const { getAllPostsTypes, getOnePostsType, createPostsType, updatePostsType, deletePostType, getPostsTypeswithpagination } = require("../services/postsTypes");
const { Op } = require("sequelize");

const postTypesApi = {

  //Get All Posts Types without pagination
  getAllPostsTypes: async (req, res) => {
    try {
      const data = await getAllPostsTypes();
      res.status(200).json({ error: false, msg: "Show all PostsTypes successfully", data:{rows:data} });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One Posts Types
  getPostTypeById: async (req, res) => {
    const { postTypeId } = req.params
    try {
      const postsTypes = await getOnePostsType({ postTypeId: postTypeId });
      res.status(200).json({ error: false, msg: "PostsTypes found successfully", data: postsTypes });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create Posts Types
  createPostType: async (req, res) => {
    const { name } = req.body;
    const postsTypesData = { name }
    try {
      await createPostsType(postsTypesData);
      res.status(200).json({ error: false, msg: "Posts Types created successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Update Posts Types
  updatePostType: async (req, res) => {
    const { postTypeId } = req.params
    const postsTypesData = req.body;
    try {
      await updatePostsType({ postTypeId: postTypeId }, postsTypesData);
      res.status(200).json({ error: false, msg: "Posts Types updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Delete Posts Types
  deletePostType: async (req, res) => {
    const { postTypeId } = req.params
    try {
      await deletePostType({ postTypeId: postTypeId });
      res.status(200).json({ error: false, msg: "Posts Types deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get All Posts Types with pagination
  getPostTypesWithPagination: async (req, res) => {
    try {
      const { orderBy = "postTypeId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            name: { [Op.like]: `%${search}%` },
            slug:{ [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Posts Types with pagination and apply filter
      const data = await getPostsTypeswithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allPostTypes = await getAllPostsTypes( whereClause);
        responseData = { error: false, msg: "Show All Post Types", data:{rows: allPostTypes} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Posts Types with Pagination",
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
      console.error("Error occurred while fetching PostsTypes:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Posts Types
  bulkDeletePostsTypes: async (req, res) => {
    const { postTypeIds } = req.body; // Assuming an array of post IDs is sent in the request body
    try {
      // Perform bulk delete
      await deletePostType({ postTypeId: { [Op.in]: postTypeIds } });
      res.status(200).json({ error: false, msg: "Posts Type deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

}

module.exports = postTypesApi;
