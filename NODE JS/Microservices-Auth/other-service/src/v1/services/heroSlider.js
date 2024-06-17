const HeroSlider = require("../models/heroSlider");

// Get All Hero Sliders with pagination
async function getHeroSlidersWithPagination(whereParams, otherData) {
  const data = await HeroSlider.findAndCountAll({
    ...whereParams,
    ...otherData,
  });

  if (!data || data.rows.length === 0) {
    return {
      rows: []
    };
  }

  return data;
}

// Get All Hero Sliders without pagination
async function getAllHeroSliders(whereParams) {
  const data = await HeroSlider.findAll({
    where: whereParams
  });

  return data;
}

// Get One Hero Slider
async function getOneHeroSlider(whereParams) {
  const data = await HeroSlider.findOne({ where: whereParams });
  if (!data) throw new Error("Hero Slider not found");
  return data;
}

// Create Hero Slider
async function createHeroSlider(heroSliderData) {
  const heroSlider = await HeroSlider.create(heroSliderData);
  if (heroSlider) {
    return heroSlider;
  } else {
    throw new Error("Hero Slider not created");
  }
}

// Update Hero Slider
async function updateHeroSlider(updateParams, heroSliderData) {
  const existingHeroSlider = await getOneHeroSlider(updateParams);
  if (!existingHeroSlider) {
    throw new Error("Hero Slider not found");
  }
  await existingHeroSlider.update(heroSliderData);
  return existingHeroSlider;
}

// Delete Hero Slider
async function deleteHeroSlider(whereParams) {
  const data = await HeroSlider.destroy({ where: whereParams });
  if (data === 0) {
    throw new Error("Hero Slider not found");
  }
  return { msg: "Hero Slider deleted successfully" };
}

module.exports = {
  getAllHeroSliders,
  getOneHeroSlider,
  createHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
  getHeroSlidersWithPagination
};
