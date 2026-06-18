const connectDB = require("./db");
const express = require('express');
const authRoutes = require('./auth');
const productRoutes = require('./product')

const app = express();
app.use(express.json())
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
connectDB();

const PORT = 3000;

app.get('/health', async (req, res) => {
   res.send("Server is running");
    
})
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

