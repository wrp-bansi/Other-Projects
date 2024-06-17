
const logger = require("../helpers/logger-helper");
const { getCouponwithpagination, getAllCoupons, getOneCoupon, createCoupon, updateCoupon, deleteCoupon } = require("../services/coupon");
const { Op } = require("sequelize");

const couponApi = {

  // Check if Coupon is Valid
  checkCouponValidity: async (req, res, next) => {
    try {
      const { couponCode } = req.params;

      // Query the database to find the coupon by its code
      const coupon = await getOneCoupon({

        couponCode: couponCode,
        isActive: true,
        expiryDate: { [Op.gt]: new Date() } // Check if expiry date is in the future

      });

      if (coupon) {
        return res.status(200).send({ error: false, msg: "This is valid coupon",coupon: coupon });
      } else {
        return res.status(400).send({ error: true, msg: 'Invalid coupon code or expired' });
      }
    } catch (error) {
      // Handle any errors that occur during coupon validation
      logger.error('Error validating coupon:', error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Coupons with pagination
  getAllCouponswithPagination: async (req, res) => {
    try {
      const { orderBy = "couponId", order = "DESC", search = "", isDownload = false, filter = {} } = req.query;
      const {expiryDate} = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);
      const expiryDateObj = new Date(expiryDate);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            isActive: { [Op.like]: `%${search}%` },
            description: { [Op.like]: `%${search}%` },
            expiryDate: {[Op.eq]: [expiryDateObj]},
          }
        };
      }

      // Get Coupons with pagination and apply filter
      const data = await getCouponwithpagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allCoupons = await getAllCoupons(whereClause);
        responseData = { error: false, msg: "Show All Coupons", data:{rows: allCoupons} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Coupons with Pagination",
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
      logger.error(error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All Coupons without pagination
  getAllCoupons: async (req, res) => {
    try {
      const data = await getAllCoupons();
      res.status(200).json({ error: false, msg: "Coupons fetched successfully", data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One Coupon
  getCouponById: async (req, res) => {
    const { couponId } = req.params;
    try {
      const data = await getOneCoupon({ couponId: couponId });
      if (!data) throw new Error("Coupon not found");
      res.status(200).send({ error: false, msg: "Show Coupon by id", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Create Coupon
  createCoupon: async (req, res) => {
    const { couponCode, discountType, discountAmount, expiryDate, isActive, usageCount,description } = req.body;
    const couponData = { couponCode, discountType, discountAmount, expiryDate, isActive, usageCount,description };
    try {
      await createCoupon(couponData)
      res.status(200).send({ error: false, msg: "Coupon created successfully'" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Update Coupon
  updateCoupon: async (req, res) => {
    const { couponId } = req.params;

    const updateData = req.body;
    try {
      await updateCoupon({ couponId: couponId }, updateData);
      res.status(200).send({ error: false, msg: "Coupon updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Delete Coupon
  deleteCoupon: async (req, res) => {
    const { couponId } = req.params;
    try {
      await deleteCoupon({ couponId: couponId });
      res.status(200).send({ error: false, msg: "Coupon deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Update Coupon Status
  updateCouponStatus: async (req, res) => {
    try {
      const {couponId} = req.params;
      const {isActive} = req.body;
      await updateCoupon({couponId: couponId}, {isActive: isActive});
      return res.status(200).json({error: false, msg: 'Coupon status updated successfully'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: true, msg: error.message});
    }
  },

  // Bulk-Delete Coupons
  bulkDeleteCoupons: async (req, res) => {
    try {
      const {couponIds} = req.body;

      // Perform bulk delete operation
      await deleteCoupon({couponId: {[Op.in]: couponIds}});
      // Return success response
      return res.status(200).json({error: false, msg: "Coupons deleted successfully"});
    } catch (error) {
      return res.status(400).json({error: true, msg: error.message});
    }
  },

};

module.exports = couponApi;

