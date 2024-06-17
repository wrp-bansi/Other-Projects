const ActivityLog = require("../models/activityLog");

//Get All ActivityLog with pagination
async function getActivityLogswithgpagination(whereParams, otherdata) {
  const data = await ActivityLog.findAndCountAll({
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

//Get All Activity Log without pagination
async function getAllActivityLogs(whereParams) {

  const data = await ActivityLog.findAll({
    where: whereParams
  });

  return data;

}

//Get One Activity Log
async function getOneActivityLog(whereParams) {
  const data = await ActivityLog.findOne({ where: whereParams });
  if (!data) throw new Error("Activity Log not found");
  return data;
}


//Create Activity Log
async function createActivityLog(activityData) {
  const activitydata = await ActivityLog.create(activityData);
  if (activitydata) {
    return activitydata;
  } else {
    throw new Error("Activity Log not created");
  }
}

//Delete Activity Log
async function deleteActivityLog(whereParams) {
  const data = await ActivityLog.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Activity Log not found");
  }
  return { msg: "Activity Log deleted successfully" };
}

module.exports = { getActivityLogswithgpagination,getAllActivityLogs,getOneActivityLog,createActivityLog,deleteActivityLog };
