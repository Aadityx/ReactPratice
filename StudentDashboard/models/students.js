const mongoose = require('mongoose');

const studentSchmema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    grade : {
        type : String,
        required : true
    }
});     