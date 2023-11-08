const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Department = require('./departmentModel');
const Course = require('./courseModel');


const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    middle_name: String,
    year_level: String,
    student_id: String,
    role: String,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    address: {
        house_no: String,
        street: String,
        baranggay: String,
        city: String,
        province: String,
        zip_code: String
    },
    email: String,
    birthdate: String,
    contact: String,
    emergency_contact: String,
    last_school_attended: String,
    hobbies: String,
    skills: String,
    sports: String,
});

const Student = mongoose.model('Student', studentSchema);


module.exports = {Student}