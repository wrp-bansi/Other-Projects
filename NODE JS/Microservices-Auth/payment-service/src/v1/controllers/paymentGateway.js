
const logger = require("../helpers/logger-helper");
const { getPaymentGatewayspagination, getAllPaymentGateways, getOnePaymentGateway, createPaymentGateway, updatePaymentGateway } = require("../services/paymentGateway");
const { Op } = require("sequelize");

const PaymentGatewaysApi = {

  //Get All PaymentGateway with pagination
  getAllPaymentGatewaywithPagination: async (req, res) => {
    try {
      const { orderBy = "paymentGatewayId", order = "DESC", search = "", isDownload = false, filter = {} } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            paymentGatewayName: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get PaymentGateways with pagination and apply filter
      const data = await getPaymentGatewayspagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allPaymentGateways = await getAllPaymentGateways(whereClause);
        responseData = { error: false, msg: "Show All PaymentGateways", data:{rows: allPaymentGateways} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All PaymentGateways with Pagination",
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
      console.error("Error occurred while fetching PaymentGateway:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Get All PaymentGateway without pagination
  getAllPaymentGateways: async (req, res) => {
    try {
      const data = await getAllPaymentGateways({status:'Active'});
      res.status(200).json({ error: false, msg: "Show All PaymentGateways", data:{rows:data} });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  //Get One PaymentGateway
  getPaymentGatewayById: async (req, res) => {
    const { paymentGatewayId } = req.params;
    try {
      const data = await getOnePaymentGateway({paymentGatewayId: paymentGatewayId });
      res.status(200).send({ error: false, msg: "Show PaymentGateway by id", data });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Create All PaymentGateway
  createPaymentGateway: async (req, res) => {
    const { paymentGatewayName, paymentGatewayUrl, paymentGatewayImage, paymentGatewayMode, keyId, keySecret, merchantId, merchantKey, clientId, clientSecret, other } = req.body;
    try {
      // Generate slug
      const slug = `${paymentGatewayName.toLowerCase().replace(/\s+/g, '-')}`;
      const PaymentGatewayData = {
        paymentGatewayName,
        paymentGatewayUrl,
        paymentGatewayImage,
        paymentGatewayMode,
        keyId,
        keySecret,
        merchantId,
        merchantKey,
        clientId,
        clientSecret,
        other,
        slug
      };
      await createPaymentGateway(PaymentGatewayData)
      res.status(200).send({ error: false, msg: "PaymentGateway created successfully'" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Update PaymentGateway
  updatePaymentGateway: async (req, res) => {
    const { paymentGatewayId } = req.params;

    const updateData = req.body;
    try {
      await updatePaymentGateway({ paymentGatewayId: paymentGatewayId }, updateData);
      res.status(200).send({ error: false, msg: "PaymentGateway updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ error: true, msg: error.message });
    }
  },

  //Update paymnet PaymentGateway Status
  updatePaymentGatewayStatus: async (req, res) => {
    try {
      const { paymentGatewayId } = req.params;
      const { status } = req.body;

      await updatePaymentGateway({ paymentGatewayId:paymentGatewayId }, { status:status });
      return res.status(200).json({ error: false, msg: 'payment Gateway status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  },

};

module.exports = PaymentGatewaysApi;

