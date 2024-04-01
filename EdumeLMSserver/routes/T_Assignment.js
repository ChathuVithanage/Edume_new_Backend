// routers/fileRouter.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/t_AssignmentController');
const getAllAssignment = require('../controllers/t_AssignmentController')

//multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files'); // Save uploaded files to 'files' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
  
}) 


//create multer instance
const upload = multer({ storage: storage })


router.post('/upload', upload.single('file'), fileController.uploadFile);

// routers/fileRouter.js
router.get('/pdfs', fileController.getAllAssignment);

//router.get('/pdfs/:id', fileController.getAssignmentById)


module.exports = router;
