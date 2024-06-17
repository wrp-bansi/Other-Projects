const fs = require("fs").promises;
const path = require("path");
const Category = require("../models/categories");

const cacheFilePath = path.resolve(__dirname, "../cache/cache.json");

// Function to fetch data from cache or database
const getDataFromCache = async (cacheKey) => {
  let cacheDetails = {};

  try {
    // Read cache file
    const fileCache = await fs.readFile(cacheFilePath, "utf8");
    cacheDetails = JSON.parse(fileCache);
  } catch (error) {
    // Cache file doesn't exist or unable to read, initialize cacheDetails as empty object
    cacheDetails = {};
  }

  // Check if the data exists in the cache
  // eslint-disable-next-line no-prototype-builtins
  if (cacheDetails.hasOwnProperty(cacheKey)) {
    // Return data from cache
    return cacheDetails[cacheKey];
  } else {
    // Fetch new data from the database
    const newData = await Category.findAll(); // Assuming getAllPostsCategory is defined elsewhere

    // Update cache with new data
    cacheDetails[cacheKey] = newData;

    try {
      // Write updated data to cache file
      await fs.writeFile(cacheFilePath, JSON.stringify(cacheDetails, null, 2));
    } catch (error) {
      console.error("Error occurred while writing to cache:", error);
    }

    return newData;
  }
};

// Function to manually invalidate cache
const invalidateCache = async () => {
  try {
    // Delete cache file
    await fs.unlink(cacheFilePath);
    console.log("Cache invalidated successfully.");
  } catch (error) {
    console.error("Error occurred while invalidating cache:", error);
  }
};


module.exports = { getDataFromCache,invalidateCache };
