
const { invalidateCacheValue } = require("../helpers/chche-helper");
const logger = require("../helpers/logger-helper");
const { getAllSettings, getOneSetting, createSetting, updateSetting, deleteSetting, getSettingwithgpagination } = require("../services/setting");
const { Op } = require("sequelize");

const settingsApi = {

  //Get All Settings with pagination
  getAllSettingwithPagination: async (req, res) => {
    try {
      const { orderBy = "settingId", order = "DESC", search = "", isDownload = false, filter = {} } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            key: { [Op.like]: `%${search}%` },
            value: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Setting with pagination and apply filter
      const data = await getSettingwithgpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allSettings = await getAllSettings(whereClause);
        responseData = { error: false, msg: "Show All Settings", data:{rows: allSettings} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Settings with Pagination",
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
      console.error("Error occurred while fetching Settings:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Settings without pagination
  getAllSettings: async (req, res) => {
    try {
      const data = await getAllSettings({ isActive: false });
      res.status(200).json({ error: false, msg: "Inactive settings retrieved successfully", data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One Setting
  getSettingById: async (req, res) => {
    const { settingId } = req.params;
    try {
      const data = await getOneSetting({ settingId: settingId });
      res.status(200).send({ error: false, msg: "Show Setting by id", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Get Key-Value Pairs from Settings
  getKeyValues: async (req, res) => {
    try {
      const settings = await getAllSettings();

      // Extract key-value pairs from settings
      const keyValues = {};
      settings.forEach(setting => {
        keyValues[setting.key] = setting.value;
      });

      res.status(200).json({ error: false, msg: "Key-Value pairs retrieved successfully", data:keyValues});
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Create Setting
  createSetting: async (req, res) => {
    const { key, value, label, description, isEditable, isActive, fieldType, fieldOptions } = req.body;
    const settingData = { key, value, label, description, isEditable, isActive, fieldType };
    // Add fieldOptions only if fieldType is 'select'
    if (fieldType === 'select' && fieldOptions) {
      settingData.fieldOptions = fieldOptions;
    }
    try {
      await createSetting(settingData)
      res.status(200).send({ error: false, msg: "Setting created successfully'" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Update Setting
  updateSetting: async (req, res) => {
    const { settingId } = req.params;

    const updateData = req.body;
    try {
      await updateSetting({ settingId: settingId }, updateData);
      // Invalidate cache after bulk update
      await invalidateCacheValue();
      res.status(200).send({ error: false, msg: "Setting updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Delete Setting
  deleteSetting: async (req, res) => {
    const { settingId } = req.params;
    try {
      await deleteSetting({ settingId: settingId });
      // Invalidate cache after bulk update
      await invalidateCacheValue();
      res.status(200).send({ error: false, msg: "Setting deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Bulk-Update Setting
  bulkUpdateSetting: async (req, res) => {
    try {
      const settingsToUpdate = req.body;

      // Loop through the array of settings to update
      for (const settingData of settingsToUpdate) {
        const { settingId, ...updateData } = settingData;

        if (!settingId) {
          throw new Error('Each setting must have a settingId for updating.');
        }

        // Update setting by settingId
        await updateSetting({ settingId }, updateData);
      }
      // Invalidate cache after bulk update
      await invalidateCacheValue();
      res.status(200).json({ error: false, msg: 'Settings updated successfully' });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

};

module.exports = settingsApi;

