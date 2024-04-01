const mongoose = require('mongoose')


const dbStudentSchema = new mongoose.Schema({
    student_id: {type: String},
    payment: {
        payment_date: {type: Date},
        isPaied: {type: Boolean}
    },
    course: {
        course_name: {type:String},
        course_category: {type:String},
        course_entroll: {type: Boolean}
    },
    semester_reg: {
        semester_name: {type:String},
        semester_reg_date: {type: Date},
        semester_reg_entroll: {type: Boolean}
    },
    module: [{
        module_id: {type: String},
        module_name: {type:String}
    }],
    student_atendence: {type: String}
})

const DBStudentModel = mongoose.model("dbStudent", dbStudentSchema)
module.exports = DBStudentModel