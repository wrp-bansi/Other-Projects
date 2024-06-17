
const bcrypt = require("bcryptjs");
const logger = require("../helpers/logger-helper");
const { getAdmin, createAdmin } = require('../services/admin')

var adminApi = {
  // This is For Create Admin
  adminCreate: async (req, res) => {
    try {
      const { email, password, firstName, lastName, mobile, role } = req.body;

      // Check if admin with email already exists
      const admin = await getAdmin({'email' : email});


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await createAdmin(email, hashedPassword, firstName, lastName, mobile, role);
      res.status(201).json({ msg: "Admin created successfully" });
    } catch (error) {
      logger.error(error);
      res
        .status(400)
        .json({error:true, msg: error.message });
    }
  },
};

module.exports = adminApi;






