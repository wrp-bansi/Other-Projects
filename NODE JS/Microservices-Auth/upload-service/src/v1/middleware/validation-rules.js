const validationRules = {
  uploadImage: {
    body: {
      files: "required"
    }
  },
  uploadMultipleImages: {
    body: {
      files: "required|array"
    }
  },
  uploadDocument: {
    body: {
      document: "required"
    }
  },
  uploadMultipleDocuments: {
    body: {
      documents: "required|array"
    }
  },
  moveImagesAndDoc: {
    body: {
      files: "required|array",
      folderName: "required|string"
    }
  },
  uploadCSVToJson: {
    body: {
      csvFilePath: "required|string"
    }
  }

};

module.exports = validationRules;
