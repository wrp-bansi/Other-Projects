const { sequelize, DataTypes } = require("../config/mysql-db");

const HeroSlider = sequelize.define(
  "hero_slider", {
    heroSliderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "hero_slider_id"
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "image_url"
    },
    bannerTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "banner_title"
    },
    bannerDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "banner_description"
    },
    bannerButtonText: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "banner_button_text"
    },
    bannerButtonLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "banner_button_link"
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "order"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    }
  }, {
    tableName: "hero_slider",
    timestamps: true
  }
);

// Export the HeroSlider model
module.exports = HeroSlider;
