const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aadityx:asdfghjkl@cluster0.hvrdkkc.mongodb.net/Student');
        console.log('MongoDB connected');
    } catch (err) { 
        console.error('MongoDB connection error:', err);
    };
};

module.exports = connectDB;