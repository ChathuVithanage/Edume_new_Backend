const mongoose = require('mongoose')

const dbCourseSchema = new mongoose.Schema({
    courseID: {type: String, required: true},
    courseName: {type: String, required: true},
    category: {type: String, required: true},
    details: {type: String},
    content: {type: String},       
    duration: {type: String},
    fee: {type: String},
    
})

const DBCourseModel = mongoose.model("dbCourse", dbCourseSchema)
module.exports = DBCourseModel