const Notification = require('../models/notifications');

//Get All Notification without pagination
async function getAllifications(whereParams) {

  const data = await Notification.findAll({ where: whereParams });


  return data;
}

//Delete Notification
async function deleteNotification(deleteParams) {
  const data = await Notification.destroy({ where: deleteParams })
  if (data === 0) {
    throw new Error("Notification not found");
  }
  return { msg: "Notification deleted successfully" };
}

//Create Notification
async function createNotification(createParams) {
  const notification = await Notification.create({ ...createParams });
  return notification;

}

//Get All Notification with pagination
async function getNotificationwithpagination(whereParams, otherdata) {
  const data = await Notification.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });
  // If no Notification found, throw an error
  if (!data || data.rows.length === 0) {
    return { count: 0, rows: [] };
  }

  return data;
}

module.exports = { getAllifications, getNotificationwithpagination, deleteNotification, createNotification }