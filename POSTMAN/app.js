const express = require('express');
const connectDB = require('./db');
const User = require('./models/users');

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
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});