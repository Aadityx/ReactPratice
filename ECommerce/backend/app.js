const connectDB = require("./db");
const express = require('express');
const authRoutes = require('./auth');
const productRoutes = require('./product')
const orderRoutes = require('./order');

const app = express();
app.use(express.json());

// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/order', orderRoutes);
connectDB();

const PORT = 3000;

app.get('/health', async (req, res) => {
   res.send("Server is running");
    
})
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

