const express = require('express');

const app = express();
app.use(express.json());
const PORT = 5000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

