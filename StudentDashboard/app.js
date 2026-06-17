const express = require("express");
const connectDB = require('./db');
const student = require("./models/student");
const bcrypt = require("bcrypt");

const app = express();
connectDB();
app.use(express.json());

const PORT = 5000;

app.get('/health' , (req,res) => {
    res.send('Server is running.')
    
})

app.post('/register', async(req,res) => {
    const {name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new student({name, email, password : hashedPassword});
        await newStudent.save();
        res.status(201).send('Student Registered Successfully');
    }
    catch(error){
        res.status(500).send('Registeration Failed' );
    }
})

app.post('/login', async(req,res) => {
    const {email, password} = req.body;
    try{
        const Student = await student.findOne({email});
        if(!Student){
            return res.status(400).send('Invalid Email');
        }
        const isMatch = await bcrypt.compare(password, Student.password);
        if(!isMatch){
            return res.status(400).send('Invalid Password');
        }
        res.send('Login successful');
    }
    catch(error){
        console.log("Failed to Login : ", error);
        
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})