const PostsCategory = require("../models/postsCategory");
const slugify = require('slugify');

//Get All Posts Category with pagination
async function getPostsCategorywithpagination(whereParams, otherdata) {
  const data = await PostsCategory.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no Posts Category found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Posts Category without pagination
async function getAllPostsCategory(whereParams) {

  const data = await PostsCategory.findAll({
    where: whereParams
  });

  return data;

}

//Get one Posts Category
async function getOnePostsCategory(whereParams) {
  const data = await PostsCategory.findOne({ where: whereParams });
  if (!data) throw new Error("Posts Category not found");
  return data;
}

//Create Posts Category
async function createPostsCategory(postsCategorysData) {
  const slug = slugify(postsCategorysData.name, { lower: true });
  const postsCategorysDataDataWithSlug = { ...postsCategorysData, slug };
  const postcategory = await PostsCategory.create(postsCategorysDataDataWithSlug);
  if (postcategory) {
    return postcategory;
  } else {
    throw new Error("Posts Category not created");
  }
}

//Update Posts CategoryWith slug
async function updatePostsCategorywithSlug(updateParams, postsCategorysData) {
  // Check if the category exists
  const existingpostsCategory = await getOnePostsCategory(updateParams);
  if (!existingpostsCategory) {
    throw new Error("Posts Category not found");
  }

  // Update post data
  const slug = slugify(postsCategorysData.name, { lower: true });
  await existingpostsCategory.update({ ...postsCategorysData, slug });


  // Return the updated category
  return existingpostsCategory;
}

//Update Posts Category
async function updatePostsCategory(updateParams, postsCategorysData) {
  // Check if the category exists
  const existingpostsCategory = await getOnePostsCategory(updateParams);
  if (!existingpostsCategory) {
    throw new Error("Posts Category not found");
  }

  // Category exists, proceed with the update
  await existingpostsCategory.update(postsCategorysData);

  // Return the updated category
  return existingpostsCategory;
}

//Delete Posts Category
async function deletePostsCategory(whereParams) {
  const data = await PostsCategory.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Posts Category not found");
  }
  return { msg: "Posts Category deleted successfully" };
}


module.exports = { getAllPostsCategory, getOnePostsCategory, createPostsCategory, updatePostsCategory,updatePostsCategorywithSlug, deletePostsCategory, getPostsCategorywithpagination };
