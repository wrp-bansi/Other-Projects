const {moveFileToFolder} = require("../services/upload");
const allUploadModule = require('../helpers/upload-helpers')
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();
const path = require('path');

const UPLOAD_ENV = process.env.UPLOAD_ENV;

const uploadApi = {

  uploadImage: async (req, res) => {
    try {
      const finalImagePath = await allUploadModule.uploadFile(req.file, UPLOAD_ENV);

      res.status(200).json({error: false, msg: "image upload sucessfully", finalImagePath});
    } catch (error) {

      res.status(400).json({error: true, msg: error.message});
    }
  },

  uploadMultipleImages: async (req, res) => {
    try {
      const finalImagePaths = [];

      for (const file of req.files) {
        const finalImagePath = await allUploadModule.uploadFile(file, UPLOAD_ENV);
        finalImagePaths.push(finalImagePath);
      }

      res.status(200).json({error: false, msg: "images upload sucessfully", finalImagePaths});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  uploadDocument: async (req, res) => {
    try {
      const finalDocumentPath = await allUploadModule.uploadFile(req.file, UPLOAD_ENV);
      res.status(200).json({error: false, msg: "Documnet upload sucessfully", finalDocumentPath});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  uploadMultipleDocuments: async (req, res) => {
    try {
      const finalDocumentPaths = [];

      for (const file of req.files) {
        const finalDocumentPath = await allUploadModule.uploadFile(file, UPLOAD_ENV);
        finalDocumentPaths.push(finalDocumentPath);
      }

      res.status(200).json({error: false, msg: "documnets upload sucessfully", finalDocumentPaths});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }

  },

  moveImagesAndDoc: async (req, res) => {
    try {
      const {files, folderName} = req.body;
      const finalPaths = await moveFileToFolder(files, folderName);
      res.status(200).json({error: false, msg: "files moved sucessfully", finalPaths});
    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }
  },

  uploadCSVToJson: async (req, res) => {
    try {
      // Check if the file exists
      const csvFilePath = path.join(__dirname, '..',req.body.csvFilePath || req.query.csvFilePath);

      // Read the CSV file and convert it to JSON
      const products = [];
      fs.createReadStream(csvFilePath)
        .pipe(csv({headers: true})) // Parse the first row as headers
        .on('data', (row) => {
          const product = {
            productName: row['_0'],
            description: row['_1'],
            regularPrice: row['_2'],
            salePrice: row['_3'],
            stock: row['_4'],
            categoryId: row['_5'],
            brandId:row['_6'],
            SKU: row['_7'],
            barcode: row['_8'],
            productImage: row['_9'],
            productStatus: row['_10'],
            weight: row['_11'],
            length: row['_12'],
            width: row['_13'],
            height: row['_14'],
            optionalNotes: row['_15'],
            isEnquiry:row['_16']
          };
          products.push(product);
        })
        .on('end', () => {
          products.shift();
          res.status(200).json({error: false, msg: 'CSV file converted to JSON successfully', products});
        });

    } catch (error) {
      res.status(400).json({error: true, msg: error.message});
    }

  }

};

module.exports = uploadApi;
