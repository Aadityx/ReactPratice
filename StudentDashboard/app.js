const express = require("express");
const connectDB = require('./db');
const student = require("./models/student");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const app = express();
connectDB();
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = 'my_secret_key';

app.get('/health' , (req,res) => {
    res.send('Server is running.')
    
})

app.post('/register', async(req,res) => {
    const {name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new student({name, email, password : hashedPassword});
        await newStudent.save();
        res.status(201).json(
            {
                status : "Success",
                message : "Student Regsiteration Success"
            }
        );
    }
    catch(error){
        res.status(500).json(
            {
                status : "Error",
                message : "User Registeration Failed"
            }
        );
    }
})

app.post('/login', async(req,res) => {
    const {email, password} = req.body;
    try{
        const Student = await student.findOne({email});
        if(!Student){
            return res.status(400).json(
                {
                    status : "Bad Request",
                    message : "Invalid email"
                }
            );
        }
        const isMatch = await bcrypt.compare(password, Student.password);
        if(!isMatch){
            return res.status(400).json(
                {
                    status : "Bad Request",
                    message : "Invalid Password"
                }
            );
        }

        const token = jwt.sign(
            {
                email : Student.email,
                name : Student.name
            }, SECRET_KEY,
            {
                expiresIn : '1h'
            }
        );

        res.status(200).json(
            {
                status : "Success",
                message : "Login Successful",
                token : token
            }
        );
    }
    catch(error){
        res.json(
            {
                status : "Error",
                message : "Cannot Login"
            }
        );
        
    }
})


app.get('/details', async (req,res ) => {
    const Details = await student.find();
    res.json(
        {
            status : "Data fetched",
            Details 
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})