const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true
        },
        email : {
            type : String,
            unique : true,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        userID : {
            type : Int,
            unique : true,
            required : true
        },
        userType : {
            type : String,
            enum : ['seller', 'customer'],
            required : true
        }
    },
    {timestamps : true}
);

module.exports = userSchema
