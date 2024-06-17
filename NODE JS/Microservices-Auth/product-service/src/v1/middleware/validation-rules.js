

const validationRules = {
  createCategory: {
    body: {
      categoryName: "required|string",
      parentCategoryId: "integer",
      description: "string",
      categoryImage:"array",
      categoryStatus: "string"
    }
  },
  updateCategory: {
    params: {
      categoryId: "required|integer"
    },
    body: {
      categoryName: "string",
      parentCategoryId: "integer",
      description: "string",
      categoryImage:"array",
      categoryStatus: "string"
    }
  },
  deleteCategory: {
    params: {
      categoryId: "required|integer"
    }
  },
  updateCategoryStatus: {
    params: {
      categoryId: "required|integer"
    },
    body: {
      categoryStatus: "required|string|in:Active,InActive"
    }
  },
  bulkDeleteCategories: {
    body: {
      categoryIds: "required|array",
      "categoryIds.*": "integer"
    }
  },
  createProduct: {
    body: {
      productName: "required|string",
      description: "string",
      regularPrice: "numeric",
      salePrice: "numeric",
      stock: "integer",
      categoryId: "required|integer",
      brandId :"required|integer",
      SKU: "string",
      productImage: "array",
      productStatus: "string|in:Active,InActive",
      weight: "numeric",
      length: "numeric",
      width: "numeric",
      height: "numeric",
      optionalNotes: "string",
      type:"string|in:admin,vendor",
      isEnquiry:"boolean|in:true,false"
    }
  },
  updateProduct: {
    params: {
      productId: "integer"
    },
    body: {
      productName: "string",
      description: "string",
      regularPrice: "numeric",
      salePrice: "numeric",
      stock: "integer",
      categoryId: "integer",
      brandId :"integer",
      SKU: "string",
      productImage: "array",
      productStatus: "string|in:Active,InActive",
      weight: "numeric",
      length: "numeric",
      width: "numeric",
      height: "numeric",
      optionalNotes: "string",
      isEnquiry:"boolean|in:true,false"
    }
  },
  deleteProduct: {
    params: {
      productId: "integer"
    }
  },
  updateProductStatus: {
    params: {
      productId: "integer"
    },
    body: {
      productStatus: "required|string|in:Active,InActive",
    }
  },
  bulkDeleteProducts: {
    body: {
      productIds: "required|array",
      "productIds.*": "integer"
    }
  },getRecentlyViewedProducts:{
    body: {
      productIds: "required|array",
      "productIds.*": "integer"
    }
  },
  createReview: {
    body: {
      productId: "required|integer",
      userId: "required|integer",
      rating: "required|numeric|min:1|max:5",
      comment: "string"
    }
  },
  updateReview: {
    params: {
      reviewId: "required|integer"
    },
    body: {
      productId: "integer",
      userId: "integer",
      rating: "numeric|min:1|max:5",
      comment: "string"
    }
  },
  deleteReview: {
    params: {
      reviewId: "required|integer"
    }
  },
  bulkDeleteReviews: {
    body: {
      reviewIds: "required|array",
      "reviewIds.*": "integer"
    }
  },
  createBrand: {
    body: {
      brandName: "required|string",
      description: "string",
      logoUrl: "string",
      status: "string|in:Active,InActive"
    }
  },

  updateBrand: {
    params: {
      brandId: "required|integer"
    },
    body: {
      brandName: "string",
      description: "string",
      logoUrl: "string"
    }
  },

  deleteBrand: {
    params: {
      brandId: "required|integer"
    }
  },

  updateBrandStatus: {
    params: {
      brandId: "required|integer"
    },
    body: {
      status: "required|string|in:Active,InActive"
    }
  },

  bulkDeleteBrands: {
    body: {
      brandIds: "required|array",
      "brandIds.*": "integer"
    }
  },
  createEnquiry: {
    body: {
      productId: "required|integer",
      subject: "required|string",
      enquirerName: "required|string",
      enquirerEmail: "required|email",
      message: "required|string"
    }
  }
};

module.exports = validationRules;
