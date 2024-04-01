//
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: {type:String, required: true},
    fileUrl: {type:String, required: true},
    filename: {type:String, required: true},
    fileExtension:{type:String, required: true}, 
    size: {type:Number, required: true},
    date: { type: Date, default: Date.now }

});


// Create a model based on the schema
const Assignment = mongoose.model('db_T_Assignment', fileSchema);

module.exports = Assignment;















