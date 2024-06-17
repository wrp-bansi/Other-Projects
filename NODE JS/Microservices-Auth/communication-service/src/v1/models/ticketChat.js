const { sequelize, DataTypes } = require("../config/mysql-db");

const TicketChat = sequelize.define(
  "ticket_chats", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "ticket_id"
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "sender_id"
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "receiver_id"
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "message"
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'read',//unread
      field: "status"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at",
      get() {
        return global.datetime.formatCreationTime(this.getDataValue("createdAt"));
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "updated_at",
      get() {
        return global.datetime.formatCreationTime(this.getDataValue("updatedAt"));
      }
    }
  }, {
    tableName: "ticket_chats",
    timestamps: false
  }
);

// Define association
TicketChat.associate = models => {
  TicketChat.belongsTo(models.Ticket, {
    foreignKey: 'ticketId',
    as: 'ticket'
  });
};

module.exports = TicketChat;
