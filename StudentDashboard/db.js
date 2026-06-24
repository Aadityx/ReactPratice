const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('ur_url');
        console.log("MongoDB connected successfully.");
    }
    catch(err){
        console.log("connection failed :", err);
    }
}

module.exports = connectDB