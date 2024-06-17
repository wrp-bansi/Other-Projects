const Posts = require("../models/posts");
const slugify = require('slugify');
const PostsCategory = require("../models/postsCategory");
const PostTypes = require("../models/postsTypes");


//Get All Posts with pagination
async function getPostswithpagination(whereParams,otherdata) {
  const data = await Posts.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no Posts found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Posts without pagination
async function getAllPosts(whereParams) {

  const data = await Posts.findAll({
    where: whereParams
  });


  return data;

}

//Get One Post
async function getOnePost(whereParams) {
  const post = await Posts.findOne({ where: whereParams,
    include: [
      {
        model: PostsCategory,
        attributes: ['name'],
        include: [
          {
            model: PostsCategory, // Include the same model to fetch child categories
            as: 'children', // Alias for the child categories
            attributes: ['name'],
            nested: true, // Enable nested loading to fetch child categories recursively
          },
        ],
      },
      {
        model: PostTypes,
        attributes: ['name']
      }
    ]
  });
  if (!post) throw new Error("Posts not found");

  return post;
}

//Create Post
async function createPost(postsData) {
  const slug = slugify(postsData.title, { lower: true });
  const postDataWithSlug = { ...postsData, slug };
  const post = await Posts.create(postDataWithSlug);
  if (post) {
    return post;
  } else {
    throw new Error("Posts not created");
  }

}

//Update Post
async function updatePost(updateParams, postsData) {
  // Check if the category exists
  const existingPost = await getOnePost(updateParams);
  if (!existingPost) {
    throw new Error("Posts not found");
  }

  // Update post data
  const slug = slugify(postsData.title, { lower: true });
  await existingPost.update({ ...postsData, slug });


  // Return the updated category
  return existingPost;
}

//Delete Post
async function deletePosts(whereParams) {
  const data = await Posts.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Posts not found");
  }
  return { msg: "Posts deleted successfully" };
}

module.exports = { getAllPosts, getOnePost, createPost, updatePost, deletePosts, getPostswithpagination };
