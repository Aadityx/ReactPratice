const express = require('express');
const authMiddleWear = require('./authMiddleWear');
const router = express.Router();

router.post('/add', authMiddleWear, async(req,res) => {
    //Add products
    res.status(200).json(
        {
            status : "Success",
            message : "New Product added"
        }
    )
})

module.exports = router;