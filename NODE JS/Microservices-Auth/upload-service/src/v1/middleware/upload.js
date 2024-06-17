const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '..', '..', 'v1', 'uploads', 'temp');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/jpeg') || file.mimetype.startsWith('image/png')) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed!'), false);
  }
};


const documentFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain','text/csv'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOCX, DOC,CSV and TXT files are allowed!'), false);
  }
};

const uploadImage = multer({storage: storage, fileFilter: fileFilter});

const uploadDocument = multer({storage: storage, fileFilter: documentFileFilter});

module.exports = {uploadImage, uploadDocument};