const connectDB = require("./db");
const express = require('express');


const app = express();
app.use(express.json())
connectDB();

const PORT = 3000;

app.get('/health', async (req, res) => {
   res.send("Server is running");
    
})
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

