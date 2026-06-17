const mongoose = require('mongoose');

const studentDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
});

const student = mongoose.model('student', studentDetails);
module.exports=student;