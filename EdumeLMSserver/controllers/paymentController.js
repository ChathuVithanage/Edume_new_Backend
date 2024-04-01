const ImageModel = require('../models/dbPayment')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');


const uploadSlip =  async (req, res) => {
  
  try {
     const base64Image = req.body.image;
     
     // Check if image data exists
     if ( !base64Image) {
       return res.status(400).json({ error: 'Email or Image data is missing' });
     }
 
     // Proceed with image processing
     const bufferImage = Buffer.from(base64Image, 'base64');
     
     const newImage = new ImageModel({
       data: bufferImage,
       contentType: 'image/png' // Adjust the content type according to your image format
     });
     await newImage.save();
     res.status(200).send('Image uploaded successfully');
   } catch (error) {
     
     res.status(500).send('Error uploading image');
   }
};

module.exports = {
  uploadSlip,
}


