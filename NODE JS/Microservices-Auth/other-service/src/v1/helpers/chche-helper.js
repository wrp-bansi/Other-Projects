const fs = require("fs").promises;
const path = require("path");
const { getAllPostsCategory } = require("../services/postsCategory");
const Setting = require('../models/setting');
const HeroSlider=require('../models/heroSlider')
require('dotenv').config(); // Load environment variables

const cacheCategoryFilePath = path.resolve(__dirname, "../cache/cache.json");
const cacheSettingFilePath = path.resolve(__dirname, '../cache/settings.json');
const cacheHeroSliderFilePath = path.resolve(__dirname, '../cache/heroSliders.json')

// For post category

// Function to fetch data from cache or database
const getDataFromCache = async (cacheKey) => {
  let cacheDetails = {};

  try {
    // Read cache file
    const fileCache = await fs.readFile(cacheCategoryFilePath, "utf8");
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
    const newData = await getAllPostsCategory(); // Assuming getAllPostsCategory is defined elsewhere

    // Update cache with new data
    cacheDetails[cacheKey] = newData;

    try {
      // Write updated data to cache file
      await fs.writeFile(cacheCategoryFilePath, JSON.stringify(cacheDetails, null, 2));
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
    await fs.unlink(cacheCategoryFilePath);
    console.log("Cache invalidated successfully.");
  } catch (error) {
    console.error("Error occurred while invalidating cache:", error);
  }
};

// For Settings value

// Function to fetch data from cache or database or env
const getSettingValue = async (key) => {
  try {
    let settings;

    // Attempt to load settings from the JSON file
    try {
      const data = await fs.readFile(cacheSettingFilePath, 'utf-8');
      settings = JSON.parse(data);
    } catch (err) {
      settings = {};
    }

    // Check if the requested setting exists in the loaded JSON settings
    if (key in settings) {
      return settings[key];
    }

    // If the setting is not found in the JSON settings, query the database
    const setting = await Setting.findOne({ where: { key } });
    if (setting) {
      // Write the fetched setting to the JSON file
      settings[key] = setting.value;
      await fs.writeFile(cacheSettingFilePath, JSON.stringify(settings, null, 2));
      return setting.value;
    }

    // If the setting is not found in the database, check environment variables
    const envValue = process.env[key];
    if (envValue !== undefined) {
      // Write the fetched setting to the JSON file
      settings[key] = envValue;
      await fs.writeFile(cacheSettingFilePath, JSON.stringify(settings, null, 2));
      return envValue;
    }

    // If neither setting nor environment variable exists, return null
    return null;
  } catch (error) {
    throw new Error(`Error fetching setting "${key}": ${error.message}`);
  }
};

// Function to manually invalidate cache
const invalidateCacheValue = async () => {
  try {
    // Delete cache file
    await fs.unlink(cacheSettingFilePath);
    console.log("Cache invalidated successfully.");
  } catch (error) {
    console.error("Error occurred while invalidating cache:", error);
  }
};

// For HeroSliders

// Function to fetch data from cache or database
const getHeroSlidersDataFromCache = async (cacheKey) => {
  let cacheDetails = {};

  try {
    // Read cache file
    const fileCache = await fs.readFile(cacheHeroSliderFilePath, "utf8");
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
    const newData = await HeroSlider.findAll(); // Assuming getAllPostsCategory is defined elsewhere

    // Update cache with new data
    cacheDetails[cacheKey] = newData;

    try {
      // Write updated data to cache file
      await fs.writeFile(cacheHeroSliderFilePath, JSON.stringify(cacheDetails, null, 2));
    } catch (error) {
      console.error("Error occurred while writing to cache:", error);
    }

    return newData;
  }
};

// Function to manually invalidate cache
const invalidateherosliderCache = async () => {
  try {
    // Delete cache file
    await fs.unlink(cacheHeroSliderFilePath);
    console.log("Cache invalidated successfully.");
  } catch (error) {
    console.error("Error occurred while invalidating cache:", error);
  }
};

module.exports = { getDataFromCache,invalidateCache,getSettingValue,invalidateCacheValue,getHeroSlidersDataFromCache,invalidateherosliderCache };
