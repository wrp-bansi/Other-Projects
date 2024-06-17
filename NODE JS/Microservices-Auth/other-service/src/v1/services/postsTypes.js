const PostTypes = require("../models/postsTypes");
const slugify = require('slugify');

//Get All Posts Types with pagination
async function getPostsTypeswithpagination(whereParams) {
  const data = await PostTypes.findAndCountAll(whereParams);

  // If no Posts Types found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Posts Types without pagination
async function getAllPostsTypes(whereParams) {

  const data = await PostTypes.findAll({
    where: whereParams
  });


  return data;

}

//Get One Posts Types
async function getOnePostsType(whereParams) {
  const data = await PostTypes.findOne({ where: whereParams });
  if (!data) throw new Error("PostTypes not found");
  return data;
}

//Create Posts Types
async function createPostsType(poststypesData) {
  const slug = slugify(poststypesData.name, { lower: true });
  const postsTypesDataDataWithSlug = { ...poststypesData, slug };
  const poststype = await PostTypes.create(postsTypesDataDataWithSlug);
  if (poststype) {
    return poststype;
  } else {
    throw new Error("Post Types not created");
  }

}

//Update Posts Types
async function updatePostsType(updateParams, poststypesData) {
  // Check if the Posts Types exists
  const existingpostsType = await getOnePostsType(updateParams);
  if (!existingpostsType) {
    throw new Error("Post Types not found");
  }

  // Update post data
  const slug = slugify(poststypesData.name, { lower: true });
  await existingpostsType.update({ ...poststypesData, slug });


  // Return the updated Posts Types
  return existingpostsType;
}

// Delete post Types
async function deletePostType(whereParams) {
  const data = await PostTypes.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Post Types not found");
  }
  return { msg: "Post Types deleted successfully" };
}

module.exports = { getAllPostsTypes, getOnePostsType, createPostsType, updatePostsType, deletePostType, getPostsTypeswithpagination };
