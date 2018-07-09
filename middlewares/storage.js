const multer = require('multer');
const path = require('path');
const maxFileSize = 5 * 1024 * 1024;

const uploadStudentProfile = (req, res, next) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: 'public/images/students',
      filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, callback) => {
      const allowFileTypes = /jpg|jpeg|png|gif/;
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowFileTypes.test(extname) || !allowFileTypes.test(file.mimetype)) {
        callback('Only allows image files');
      } else {
        callback(null, true);
      }
    },
    limits: {fileSize: maxFileSize}
  })
  .fields(
    [{name: 'avatar', maxCount: 1}, {name: 'studentCard', maxCount: 1}]
  );
  upload(req, res, function(err) {
    if (err) {
      res.status(400).send({
        message: "Unable to upload files",
        error: err
      });
    } else {
      next();
    }
  })
};

const uploadEventImage = (req, res, next) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: 'public/images/events',
      filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, callback) => {
      const allowFileTypes = /jpg|jpeg|png|gif/;
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowFileTypes.test(extname) || !allowFileTypes.test(file.mimetype)) {
        callback('Only allows image files');
      } else {
        callback(null, true);
      }
    },
    limits: {fileSize: maxFileSize}
  })
  .single('image');
  
  upload(req, res, function(err) {
    if (err) {
      res.status(400).send({
        message: "Unable to upload files",
        error: err
      });
    } else {
      next();
    }
  })
};

const uploadSponsorProfile = (req, res, next) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: 'public/images/sponsors',
      filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, callback) => {
      const allowFileTypes = /jpg|jpeg|png|gif/;
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowFileTypes.test(extname) || !allowFileTypes.test(file.mimetype)) {
        callback('Only allows image files');
      } else {
        callback(null, true);
      }
    },
    limits: {fileSize: maxFileSize}
  })
  .single('logo');
  
  upload(req, res, function(err) {
    if (err) {
      res.status(400).send({
        message: "Unable to upload files",
        error: err
      });
    } else {
      next();
    }
  })
};

module.exports = {
  uploadStudentProfile,
  uploadEventImage,
  uploadSponsorProfile
};