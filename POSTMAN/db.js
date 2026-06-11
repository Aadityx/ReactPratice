const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://aadityx:asdfghjkl@cluster0.hvrdkkc.mongodb.net/User');
        console.log('MongoDB Connected');
    
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;