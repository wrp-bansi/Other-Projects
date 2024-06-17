const Setting = require("../models/setting");

//Get All Settings with pagination
async function getSettingwithgpagination(whereParams, otherdata) {
  const data = await Setting.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no Setting found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Settings without pagination
async function getAllSettings(whereParams) {

  const data = await Setting.findAll({
    where: whereParams
  });

  return data;

}

//Get One Setting
async function getOneSetting(whereParams) {
  const data = await Setting.findOne({ where: whereParams });
  if (!data) throw new Error("Settings not found");
  return data;
}


//Create Setting
async function createSetting(settingData) {
  const setting = await Setting.create(settingData);
  if (setting) {
    return setting;
  } else {
    throw new Error("Setting not created");
  }
}

//Update Setting
async function updateSetting(updateParams, settingData) {

  const existingSetting = await getOneSetting(updateParams);
  if (!existingSetting) {
    throw new Error("Setting not found");
  }
  await existingSetting.update(settingData);

  return existingSetting;
}

//Delete Setting
async function deleteSetting(whereParams) {
  const data = await Setting.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Setting not found");
  }
  return { msg: "Setting deleted successfully" };
}

module.exports = { getSettingwithgpagination, getAllSettings, getOneSetting, createSetting, updateSetting, deleteSetting };
