const {getAllPosts, getOnePost, createPost, updatePost, deletePosts, getPostswithpagination} = require("../services/posts");
const {Op} = require("sequelize");

const postApi = {

  //Get All Posts without pagination
  getAllPosts: async (req, res) => {
    try {
      const data = await getAllPosts();
      res.status(200).json({error: false, msg: "Retrieved all posts Successfully ", data:{rows:data}});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Get One Post
  getPostById: async (req, res) => {
    const {postId} = req.params
    try {
      const post = await getOnePost({postId: postId});
      res.status(200).json({error: false, msg: "Post found Successfully ", data: post});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Create Post
  createPost: async (req, res) => {
    const {title, content, postCategoryId, postTypeId, postImage, postStatus, publicationDate, metaTitle, metaDescription, metaKeywords} = req.body;
    const postData = {title, content, postCategoryId, postTypeId, postImage, postStatus, publicationDate, metaTitle, metaDescription, metaKeywords}
    try {
      await createPost(postData);
      res.status(200).json({error: false, msg: "Post created successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Update Post
  updatePost: async (req, res) => {
    const {postId} = req.params
    const postData = req.body;
    try {
      await updatePost({postId: postId}, postData);
      res.status(200).json({error: false, msg: "Post updated successfully"});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  //Delete Post
  deletePost: async (req, res) => {
    const { postId } = req.params
    try {
      await deletePosts({ postId: postId });
      res.status(200).json({ error: false, msg: "Post deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get All Posts with pagination
  getPostsWithPagination: async (req, res) => {
    try {
      const { orderBy = "postId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            title: { [Op.like]: `%${search}%` },
            content: { [Op.like]: `%${search}%` },
            postStatus: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Posts with pagination and apply filter
      const data = await getPostswithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allPosts = await getAllPosts(whereClause);
        responseData = { error: false, msg: "Show All Posts", data:{rows: allPosts} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Posts with Pagination",
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
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Delete Post
  bulkDeletePosts: async (req, res) => {
    const { postIds } = req.body; // Assuming an array of post IDs is sent in the request body
    try {
      // Perform bulk delete
      await deletePosts({ postId: { [Op.in]: postIds } });
      res.status(200).json({ error: false, msg: "Posts deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  getPageBySlug: async (req, res) => {
    const { slug } = req.params;
    try {
      const page = await getOnePost( {slug } );

      res.status(200).json({ error: false, msg: 'Page retrieved successfully', data: page });
    } catch (error) {

      res.status(500).json({ error: true, msg: error.message });
    }
  },

}

module.exports = postApi;
