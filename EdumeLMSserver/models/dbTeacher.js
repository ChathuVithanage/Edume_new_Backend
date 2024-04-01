const mongoose = require('mongoose')


const dbTeacherSchema = new mongoose.Schema({
    id: {type: String, required: true},
    fname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    cnumber: {type: Number, required: true},
    password: {type: String, required: true},
})

const DBTeacherModel = mongoose.model("dbTeacher", dbTeacherSchema)
module.exports = DBTeacherModel