const express = require('express');
const connectDB = require('./db');
const User = require('./models/users');
const bcrypt = require('bcrypt');

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
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});