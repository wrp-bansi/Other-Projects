const validationRules = {
  createNotification: {
    body: {
      title: "required|string",
      message: "required|string",
      image: "string|url"
    }
  },
  deleteNotification: {
    params: {
      nId: "required|integer"
    }
  },
  bulkDeleteNotification: {
    body: {
      notificationIds: "required|array",
      "notificationIds.*": "integer"
    }
  },
  sendEmail: {
    body: {
      templateName: "required|string",
      userData: "required|object"
    }
  },
  sendSMS: {
    body: {
      mobile: "required|string",
      message: "required|string"
    }
  },
  createEmailTemplate: {
    body: {
      templateName: "required|string",
      subject: "required|string",
      type: "required|string",
      bodyHtml: "required|string",
      bodyText: "string",
      status: "in:Active,inActive",
      description: "string",
    },
  },
  updateEmailTemplate: {
    params: {
      id: "required|integer",
    },
    body: {
      templateName: "string",
      subject: "string",
      type: "string",
      bodyHtml: "string",
      bodyText: "string", // Assuming this field is optional
      description: "string", // Assuming this field is optional
    },
  },
  updateEmailTemplateStatus: {
    params: {
      id: "required|integer",
    },
    body: {
      status: "required|in:Active,inActive", // Assuming status should be either 'Active' or 'inActive'
    },
  },
  deleteEmailTemplate: {
    params: {
      id: "required|integer",
    },
  },
  bulkDeleteEmailTemplates: {
    body: {
      ids: "required|array",
      "ids.*": "integer", // Assuming each ID in the array is an integer
    },
  },
  createUserNotification: {
    body: {
      userId: "required|integer",
      message: "required|string",
      image: "string",
      redirectType: "required|string",
      referenceId: "integer",
      status: "string|in:unread,read"
    }
  },
  updateUserNotification: {
    params: {
      userNotificationId: "required|integer"
    },
    body: {
      userId: "integer",
      message: "string",
      image: "string",
      redirectType: "string",
      referenceId: "integer",
      status: "string|in:unread,read"
    }
  },
  deleteUserNotification: {
    params: {
      userNotificationId: "required|integer"
    }
  },
  bulkDeleteUserNotifications: {
    body: {
      userNotificationIds: "required|array",
      "userNotificationIds.*": "integer"
    }
  },
  createTicket: {
    body: {
      requestedBy: "required|string",
      email: "required|string|email",
      type: "required|string",
      subject: "required|string",
      description: "required|string",
      status: "string|in:open,closed,pending",
      attachment: "string",
      priority: "string|in:low,medium,high"
    }
  },
  updateComments: {
    params: {
      ticketId: "required|integer"
    },
    body: {
      comment:"required|string"
    }
  },
  updateTicketStatus: {
    params: {
      ticketId: "required|integer"
    },
    body: {
      status: "required|string|in:open,closed"
    }
  },
  deleteTicket: {
    params: {
      ticketId: "required|integer"
    }
  },
  bulkDeleteTickets: {
    body: {
      ticketIds: "required|array",
      "ticketIds.*": "integer"
    }
  },
  createTicketChat: {
    body: {
      ticketId: "required|integer",
      receiverId: "required|integer",
      message: "string",
      image: "string",
      status: "string|in:unread,read"
    }
  },
  updateTicketChat: {
    params: {
      ticketChatId: "required|integer"
    },
    body: {
      ticketId: "integer",
      senderId: "integer",
      receiverId: "integer",
      message: "string",
      image: "string",
      status: "string|in:unread,read"
    }
  },
  updateTicketChatStatus: {
    params: {
      ticketChatId: "required|integer"
    },
    body: {
      status: "required|string|in:read,unread"
    }
  },
  deleteTicketChat: {
    params: {
      ticketChatId: "required|integer"
    }
  },
  bulkDeleteTicketChats: {
    body: {
      ticketChatIds: "required|array",
      "ticketChatIds.*": "integer"
    }
  },
  createContact: {
    body: {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|string|email",
      mobile: 'integer|digits:10',
      subject: "required|string",
      message: "required|string",
    },
  },
  deleteContact: {
    params: {
      contactId: "required|integer",
    },
  },
  bulkDeleteContacts: {
    body: {
      contactIds: "required|array",
      "contactIds.*": "integer",
    },
  },
};

module.exports = validationRules;
