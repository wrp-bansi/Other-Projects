const Coupon = require("../models/coupon");

//Get All Coupon with pagination
async function getCouponwithpagination(whereParams, otherdata) {
  const data = await Coupon.findAndCountAll({
    ...whereParams,
    ...otherdata,
  });

  // If no Coupon found, throw an error
  if (!data || data.rows.length === 0) {
    return {
      rows: []
    }
  }

  return data;
}

//Get All Coupon without pagination
async function getAllCoupons(whereParams) {

  const data = await Coupon.findAll({
    where: whereParams
  });

  return data;

}

//Get One Coupon
async function getOneCoupon(whereParams) {
  const data = await Coupon.findOne({ where: whereParams });
  return data;
}


//Create Coupon
async function createCoupon(CouponData) {
  const coupon = await Coupon.create(CouponData);
  if (coupon) {
    return coupon;
  } else {
    throw new Error("Coupon not created");
  }
}

//Update Coupon
async function updateCoupon(updateParams, couponData) {

  const existingCoupon = await getOneCoupon(updateParams);
  if (!existingCoupon) {
    throw new Error("Coupon not found");
  }
  await existingCoupon.update(couponData);

  return existingCoupon;
}

//Delete Coupon
async function deleteCoupon(whereParams) {
  const data = await Coupon.destroy({ where: whereParams })
  if (data === 0) {
    throw new Error("Coupon not found");
  }
  return { msg: "Coupon deleted successfully" };
}

module.exports = { getCouponwithpagination, getAllCoupons, getOneCoupon, createCoupon, updateCoupon, deleteCoupon };
