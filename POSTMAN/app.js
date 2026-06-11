const express = require('express');
const connectDB = require('./db');
const User = require('./models/users');
const Student = require('./models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const app = express();
connectDB();

app.use(express.json());
const PORT = 5000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(
                {
                    status: 'Bad Request',
                    message: 'Invalid credentials'
                }
            );
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                {
                    status: 'Bad Request',
                    message: 'Invalid credentials'
                }
            );
        }

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name
            }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json(
            {
                status: 'OK',
                message: 'Login successful',
                token: token
            });
    } catch (err) {
        console.error(err);
        res.status(500).json(
            {
                status: 'Internal Server Error',
                message: 'Server error',
            }
        );
    }
});


app.get('/student', async (req, res) => {
    const token = req.headers['authorization'];
    console.log("Received token:", token);
    if (!token) {
        return res.status(401).json(
            {
                status: 'Unauthorized',
                message: 'Access denied'
            }
        );
    }
    let jwtToken = token.replace('Bearer ', '');
    try {
        jwt.verify(jwtToken, SECRET_KEY);
        let user = jwt.decode(jwtToken);
        console.log("Authenticated user:", user);
    } catch (err) {
        console.log("Token verification failed:", err);
        return res.status(401).json(
            {
                status: 'Unauthorized',
                message: 'Invalid token'
            }
        );
    }
    const students = await Student.find();
    res.json({
        status: "Success",
        students: students
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});