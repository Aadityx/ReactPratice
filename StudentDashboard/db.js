const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://aadityx:asdfghjkl@cluster0.hvrdkkc.mongodb.net/Student');
        console.log("MongoDB connected successfully.");
    }
    catch(err){
        console.log("connection failed :", err);
    }
}

module.exports = connectDB