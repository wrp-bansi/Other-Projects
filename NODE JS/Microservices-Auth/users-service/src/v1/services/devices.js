const device = require("../models/devices");

//Create Device
async function createDevice(createParams) {
  await device.create(createParams);
}
module.exports = {createDevice}