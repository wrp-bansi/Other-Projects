const validationRules = {
  createPost: {
    body: {
      title: "required|string",
      content: "required|string",
      postCategoryId: "required|integer",
      postTypeId: "required|integer",
      postImage: "string",
      postStatus: "string",
      publicationDate: "string|date",
      metaTitle: "string",
      metaDescription: "string",
      metaKeywords: "string"
    },
  },
  updatePost: {
    params: {
      postId: "required|integer"
    },
    body: {
      title: "string",
      content: "string",
      postCategoryId: "integer",
      postTypeId: "integer",
      postImage: "string", // Assuming this field is optional
      postStatus: "string",
      publicationDate: "string|date",
      metaTitle: "string", // Assuming this field is optional
      metaDescription: "string", // Assuming this field is optional
      metaKeywords: "string" // Assuming this field is optional
    },
  },
  deletePost:{
    params: {
      postId: "required|integer"
    },
  },
  createPostCategory: {
    body: {
      name: "required|string",
      parentId: "integer",
      categoryImage: "string",
      categoryStatus: "string",
      metaTitle: "string",
      metaDescription: "string",
      metaKeywords: "string"
    }
  },
  updatePostCategory: {
    params: {
      postCategoryId: "required|integer"
    },
    body: {
      name: "string",
      parentId: "integer", // Assuming this field is optional
      categoryImage: "string", // Assuming this field is optional
      metaTitle: "string", // Assuming this field is optional
      metaDescription: "string", // Assuming this field is optional
      metaKeywords: "string" // Assuming this field is optional
    }
  },
  updatePostCategoryStatus: {
    params: {
      postCategoryId: "required|integer"
    },
    body: {
      categoryStatus: "required|string"
    }
  },
  deletePostCategory: {
    params: {
      postCategoryId: "required|integer"
    }
  },
  createPostType: {
    body: {
      name: "required|string"
    }
  },
  updatePostType: {
    params: {
      postTypeId: "required|integer"
    },
    body: {
      name: "string"
    }
  },
  deletePostType: {
    params: {
      postTypeId: "required|integer"
    }
  },
  createSetting: {
    body: {
      key: "required|string",
      value: "required|string",
      label: "required|string",
      description: "string"
    }
  },
  updateSetting: {
    params: {
      settingId: "required|integer"
    },
    body: {
      key: "string",
      value: "string",
      label: "string",
      description: "string",
      isEditable: "boolean",
      isActive: "boolean"
    }
  },
  deleteSetting: {
    params: {
      settingId: "required|integer"
    }
  },
  createActivityLog:{
    body: {
      userID: "required|string",
      tableName: "required|string",
      activityType: "required|string",
      description: "string"
    }
  },
  deleteActivityLog :{
    params: {
      logId: "required|integer"
    }
  },
  bulkDeleteActivityLog: {
    body: {
      logIds: "required|array",
      "logIds.*": "integer", // Assuming each ID in the array is an integer
    },
  },
  createHeroSlider: {
    body: {
      imageUrl: "required|string",
      bannerTitle: "required|string",
      bannerDescription: "string",
      bannerButtonText: "string",
      bannerButtonLink: "string",
      order: "integer",
      isActive: "boolean"
    }
  },
  updateHeroSlider: {
    params: {
      heroSliderId: "required|integer"
    },
    body: {
      imageUrl: "string",
      bannerTitle: "string",
      bannerDescription: "string",
      bannerButtonText: "string",
      bannerButtonLink: "string",
      order: "integer",
      isActive: "boolean"
    }
  },
  deleteHeroSlider: {
    params: {
      heroSliderId: "required|integer"
    }
  },
  bulkDeleteHeroSliders: {
    body: {
      heroSliderIds: "required|array",
      "heroSliderIds.*": "integer", // Assuming each ID in the array is an integer
    },
  },
};

module.exports = validationRules;
