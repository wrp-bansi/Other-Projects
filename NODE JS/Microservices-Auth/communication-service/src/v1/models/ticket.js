const { sequelize, DataTypes } = require("../config/mysql-db");

const Ticket = sequelize.define(
  "tickets", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    requestedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "requested_by"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "type"
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "subject"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "description"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open',
      field: "status"
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "attachment"
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'), // Define enum type
      allowNull: false,
      defaultValue: 'low',
      field: "priority"
    },
    comments: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "comments",
      defaultValue: null,
      get() {
        const details = this.getDataValue("comments");
        try {
          return details ? JSON.parse(details) : null;
        } catch (error) {
          return null;
        }
      },
      set(value) {
        this.setDataValue("comments", value ? JSON.stringify(value) : null);
      }
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
    tableName: "tickets",
    timestamps: false
  }
);

// Define association
Ticket.associate = models => {
  Ticket.hasMany(models.TicketChat, {
    foreignKey: 'ticketId',
    as: 'chats'
  });
};
module.exports = Ticket;
