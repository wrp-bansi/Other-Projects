const wishList = require('../models/wishList');

// Get wishList Items with Pagination
async function getwishListwithpagination(whereParams, otherdata) {
  const data = await wishList.findAndCountAll({
    where: whereParams,
    ...otherdata,
  });

  // If no wishList found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

// Get wishList without Pagination
async function getAllwishLists(whereParams) {
  const data = await wishList.findAll(whereParams);

  return data;
}

// Get One wish List
const getSinglewishList = async (whereParams) => {
  const data = await wishList.findOne({ where: whereParams });
  return data;
};

// Create wish List
async function createwishList(wishListData) {
  const wishListCreate = await wishList.create(wishListData);
  if (wishListCreate) {
    return wishListCreate;
  }
  throw new Error('Wish List not created');
}

// Update wish List
async function updatewishList(updateParams, updateData) {
  // Check if the wish List exists
  const existingRole = await getSinglewishList(updateParams);
  if (!existingRole) {
    throw new Error('Wish List not found');
  }

  await existingRole.update(updateData);
  return existingRole;
}

// delete wish List
async function deletewishList(deleteParams) {
  const data = await wishList.destroy({ where: deleteParams });
  if (data === 0) {
    throw new Error('wish List not found');
  }
  return { msg: 'wish List deleted successfully' };
}

// Get wishList without Pagination
async function countWishlists() {
  const data = await wishList.count();

  return data;
}

module.exports = {
  getAllwishLists, getSinglewishList, createwishList, updatewishList, deletewishList, getwishListwithpagination,countWishlists
};
