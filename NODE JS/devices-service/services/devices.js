const device = require("../models/devices");


async function createDevice(createParams) {

  const admin = await device.create(createParams);

}
module.exports = { createDevice }