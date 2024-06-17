
const express = require("express");
const router = express.Router();
const {uploadImage, uploadDocument} = require("../middleware/upload");
const uploadController = require("../controllers/upload");
// const {validate} = require("../middleware/validation");
// const rules = require("../middleware/validation-rules");


router.post('/image',uploadImage.single('files'), uploadController.uploadImage);
router.post('/images', uploadImage.array('files', 5), uploadController.uploadMultipleImages);
router.post('/document',uploadDocument.single('document'), uploadController.uploadDocument);
router.post('/documents',uploadDocument.array('documents', 5), uploadController.uploadMultipleDocuments);
router.post('/move', uploadController.moveImagesAndDoc);
router.post('/csv-to-json', uploadController.uploadCSVToJson);

module.exports = router;

