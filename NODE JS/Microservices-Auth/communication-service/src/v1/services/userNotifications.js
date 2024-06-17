const UserNotification = require("../models/userNotifications");

//Get All User Notificationwith pagination
async function getUserNotificationwithpagination(whereParams) {
  const data = await UserNotification.findAndCountAll(whereParams);

  // If no Notification found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }
  return data;
}

//Get User Notification counts
async function getUserNotificationCount(whereParams) {
  const data = await UserNotification.count({
    where: whereParams
  });
  return data;
}

//Get All UserNotifications without pagination
async function getAllUserNotification(whereParams) {

  const data = await UserNotification.findAll({
    where: whereParams
  });
  return data;
}

//Get One User Notification
async function getOneUserNotification(whereParams) {
  const data = await UserNotification.findOne({ where: whereParams });
  if (!data) throw new Error("User Notification not found");
  return data;
}

//Create User Notification
async function createUserNotification(createParams) {
  const userNotification = await UserNotification.create({ ...createParams });
  return userNotification;

}

//Update user Notification
async function updateuserNotification(updateParams,NotificationData) {
  // Check if the user Notification exists
  const existingNotification = await getOneUserNotification(updateParams);
  if (!existingNotification) {
    throw new Error("User Notification not found");
  }
  //  user Notification exists proceed with the update
  await existingNotification.update(NotificationData);
  // Return the updated  user Notification
  return existingNotification;
}

// Delete User Notification
async function deleteUserNotification(whereParams) {
  const data = await UserNotification.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("User Notification not found");
  }
  return { msg: "User Notification deleted successfully" };
}

// Function to mark all unread notifications as read
async function markAllNotificationsAsRead() {
  await UserNotification.update({ status: 'read' }, { where: { status: 'unread' } });
}

module.exports = { getAllUserNotification, getOneUserNotification, createUserNotification, updateuserNotification, deleteUserNotification, getUserNotificationwithpagination,getUserNotificationCount,markAllNotificationsAsRead };
