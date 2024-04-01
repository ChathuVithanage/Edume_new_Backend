// controllers/fileController.js
const { fileURLToPath } = require('url');
const File = require('../models/db_T_Assignment');
const router = require('../routes/T_Assignment');
const path = require('path');

//save assignment file and description
const uploadFile = async (req, res) => {
  
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        const { originalname, path, size } = req.file;
        const {title }= req.body;
        
        const file = new File({
            title: title,
            filename: originalname,
            size: size,
            fileUrl: path,
            fileExtension: fileExtension
            });
       
        await file.save();
        res.status(201).json({ message: 'File uploaded successfully' });
        
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: error.message });

    }
};


// Endpoint to fetch PDF details
const getAllAssignment =  async (req, res) => {
    try {
      const pdfs = await File.find();
      res.json(pdfs);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Endpoint to serve PDF files
  const getAssignmentById = async (req, res) => {
    const id = req.params.id;
    const filePath = path.join(File, 'files', id); // Assuming files are stored in 'files' directory
    res.sendFile(filePath);
  };
  


module.exports = {
    uploadFile,
    getAllAssignment,
    getAssignmentById
}
  
  
