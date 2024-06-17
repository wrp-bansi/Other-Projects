const fs = require("fs").promises;
const path = require("path");
const Setting = require('../../../../other-service/src/v1/models/setting');
require('dotenv').config(); // Load environment variables


const getSettingValue = async (key) => {
  try {
    const jsonFilePath = path.resolve(__dirname, '../cache/settings.json');
    let settings;

    // Attempt to load settings from the JSON file
    try {
      const data = await fs.readFile(jsonFilePath, 'utf-8');
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
      await fs.writeFile(jsonFilePath, JSON.stringify(settings, null, 2));
      return setting.value;
    }

    // If the setting is not found in the database, check environment variables
    const envValue = process.env[key];
    if (envValue !== undefined) {
      // Write the fetched setting to the JSON file
      settings[key] = envValue;
      await fs.writeFile(jsonFilePath, JSON.stringify(settings, null, 2));
      return envValue;
    }

    // If neither setting nor environment variable exists, return null
    return null;
  } catch (error) {
    throw new Error(`Error fetching setting "${key}": ${error.message}`);
  }
};

module.exports = {getSettingValue };
