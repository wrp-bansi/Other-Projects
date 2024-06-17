const request = require("request");
const otp = require("../models/otps");
const { Op } = require("sequelize");
const onboards = require("../models/onboards");

var allOtpModules = {
  generateOtp: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  sendOtpToUser: function (mobile) {
    return new Promise((resolve, reject) => {
      var otp = allOtpModules.generateOtp(1000, 9999);
      otp = 1111;
      var options = {
        method: "GET",
        url:
          global.env.SMS_OTP_URL +
          "numbers=" +
          mobile +
          "&message=" +
          otp +
          "%20is%20the%20secret%20OTP%20for%20Office%20Management.%20This%20can%20be%20used%20only%20once%20and%20is%20valid%20for%2010%20mins.%20CSPL",
      };

      /* Remove it for enable send otp */
      resolve({
        error: false,
        otp: otp,
      });
      //
      // request(options, function (error, response, body) {
      //     if (error) {
      //         resolve({
      //             error: true,
      //             msg: error,
      //             otp: otp
      //         })
      //     } else {
      //         resolve({
      //             error: false,
      //             otp: otp
      //         })
      //     }
      // })
    });
  },

  sendOtp: async function (mobile, device_id) {
    /* Check OTP Limit over */
    const otpCount = await otp.count({
      where: {
        generated_at: {
          [Op.gte]: global.datetime.startOfDay(new Date()),
          [Op.lt]: global.datetime.endOfDay(new Date()),
        },
        mobile: mobile,
      },
    });
    // 5 Otp send per day Limit
    if (otpCount >= 5) {
      return {
        error: true,
        msg: "Your otp limit exceeded, Please try again later",
      };
    }
    /* Check OTP Limit over */
    var status = await allOtpModules.sendOtpToUser(mobile);

    if (status.error == false) {
      /* Insert OTP Send Log */
      let postData = {
        device_id: device_id,
        mobile: mobile,
        otp: status.otp,
        expired_at: global.datetime.plusDaysDate(1),
      };
      await otp.create(postData);
    }
    return status;
  },

  sendOtpFromAdmin: async function (mobile, device_id) {
    var user_otp = allOtpModules.generateOtp(1000, 9999);

    /* Insert OTP Send Log */
    let postData = {
      device_id: device_id,
      mobile: mobile,
      otp: user_otp,
      expired_at: global.datetime.plusDaysDate(1),
    };
    await otp.create(postData);

    return user_otp;
  },

  // verifyOtp
  verifyOtp: async function (mobile, user_otp) {
    const findOtp = await otp.findOne({
      where: {
        generated_at: {
          [Op.gte]: global.datetime.startOfDay(new Date()),
          [Op.lt]: global.datetime.endOfDay(new Date()),
        },
        mobile: mobile,
      },
      order: [["otp_id", "DESC"]],
      attributes: ["otp"],
    });
    if (findOtp && parseInt(findOtp.otp) == parseInt(user_otp)) {
      await onboards.update(
        { isVerified: true },
        { where: { mobile: mobile } }
      );

      return true;
    } else {
      return false;
    }
  },
};

module.exports = allOtpModules;
