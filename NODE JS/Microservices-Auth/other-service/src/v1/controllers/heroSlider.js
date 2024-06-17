const { getHeroSlidersDataFromCache, invalidateherosliderCache } = require("../helpers/chche-helper");
const { getAllHeroSliders, getOneHeroSlider, createHeroSlider, updateHeroSlider, deleteHeroSlider, getHeroSlidersWithPagination } = require("../services/heroSlider");
const { Op } = require("sequelize");

const heroSliderApi = {

  // Get All Hero Sliders without pagination
  getAllHeroSliders: async (req, res) => {
    try {
      const data = await getHeroSlidersDataFromCache("allHeroSliders");
      res.status(200).json({ error: false, msg: "Retrieved all hero sliders Successfully", data:{rows:data} });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get One Hero Slider
  getHeroSliderById: async (req, res) => {
    const { heroSliderId } = req.params;
    try {
      const heroSlider = await getOneHeroSlider({ heroSliderId: heroSliderId });
      res.status(200).json({ error: false, msg: "Hero Slider found Successfully", data: heroSlider });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Create Hero Slider
  createHeroSlider: async (req, res) => {
    const { imageUrl, bannerTitle, bannerDescription, bannerButtonText, bannerButtonLink, order, isActive } = req.body;
    const heroSliderData = { imageUrl, bannerTitle, bannerDescription, bannerButtonText, bannerButtonLink, order, isActive };
    try {
      await createHeroSlider(heroSliderData);
      await invalidateherosliderCache();
      res.status(200).json({ error: false, msg: "Hero Slider created successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Update Hero Slider
  updateHeroSlider: async (req, res) => {
    const { heroSliderId } = req.params;
    const heroSliderData = req.body;
    try {
      await updateHeroSlider({ heroSliderId: heroSliderId }, heroSliderData);
      await invalidateherosliderCache();
      res.status(200).json({ error: false, msg: "Hero Slider updated successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Delete Hero Slider
  deleteHeroSlider: async (req, res) => {
    const { heroSliderId } = req.params;
    try {
      await deleteHeroSlider({ heroSliderId: heroSliderId });
      await invalidateherosliderCache();
      res.status(200).json({ error: false, msg: "Hero Slider deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  },

  // Get All Hero Sliders with pagination
  getHeroSlidersWithPagination: async (req, res) => {
    try {
      const { orderBy = "heroSliderId", order = "DESC", search = "", filter = {}, isDownload = false } = req.query;
      const { offset, perPage, currentPage } = global.common.getPaginationParams(req.query);

      // Construct the where clause for filtering
      let whereClause = { ...filter };
      if (search !== "") {
        whereClause = {
          ...whereClause,
          [Op.or]: {
            imageUrl: { [Op.like]: `%${search}%` },
            bannerTitle: { [Op.like]: `%${search}%` },
            bannerDescription: { [Op.like]: `%${search}%` },
            bannerButtonText: { [Op.like]: `%${search}%` },
            bannerButtonLink: { [Op.like]: `%${search}%` },
          },
        };
      }

      // Get Hero Sliders with pagination and apply filter
      const data = await getHeroSlidersWithPagination({
        where: whereClause,
        offset,
        limit: perPage,
        order: [[orderBy, order]],
      });

      let responseData;

      if (isDownload === 'true') {
        // If downloading, return only data without pagination count
        const allHeroSliders = await getAllHeroSliders(whereClause);
        responseData = { error: false, msg: "Show All Hero Sliders", data:{rows:allHeroSliders} };
      } else {
        // If not downloading, return paginated data
        responseData = {
          error: false,
          msg: "Show All Hero Sliders with Pagination",
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
      console.error("Error occurred while fetching hero sliders:", error);
      return res.status(400).send({ error: true, msg: error.message });
    }
  },

  // Bulk Delete Hero Sliders
  bulkDeleteHeroSliders: async (req, res) => {
    const { heroSliderIds } = req.body; // Assuming an array of hero slider IDs is sent in the request body
    try {
      // Perform bulk delete
      await deleteHeroSlider({ heroSliderId: { [Op.in]: heroSliderIds } });
      await invalidateherosliderCache();
      res.status(200).json({ error: false, msg: "Hero Sliders deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

}
module.exports = heroSliderApi;