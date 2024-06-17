const { sequelize, DataTypes } = require("../config/mysql-db");

const EmailTemplate = sequelize.define(
  "email_templates", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    templateName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "template_name"
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "slug"
    },
    type: {
      type: DataTypes.ENUM('forgotpassword', 'registration', 'order','contact','enquiry'),
      allowNull: false,
      field: "type"
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "subject"
    },
    bodyHtml: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "body_html"
    },
    bodyText: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "body_text"
    },
    status: {
      type: DataTypes.ENUM('Active', 'inActive'),
      allowNull: false,
      defaultValue: 'Active',
      field: "status"
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "description"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("createdAt"), 'Y-m-d H:i:s');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "updated_at",
      get() {
        return global.datetime.changeDateFotmat(this.getDataValue("updatedAt"), 'Y-m-d H:i:s');
      }
    }
  }, {
    tableName: "email_templates",
    timestamps: false
  }
);

module.exports = EmailTemplate;
