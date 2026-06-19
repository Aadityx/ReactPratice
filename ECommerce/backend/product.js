const express = require('express');
const authMiddleWear = require('./authMiddleWear');
const router = express.Router();
const Product = require('./models/product');


router.post('/add', authMiddleWear, async(req,res) => {
    //Add products
    console.log("User Info : ", req.user);
    try{
        const {productName, description, price, inventoryCount, productImage } = req.body;
        const seller = req.user.userID;
        const product = new Product({productName, description, price, sellerID : seller, inventoryCount, productImage});
        const newProduct = await product.save();
        res.status(201).json(
            {
                status : "Success",
                message : "New Product added",
                product : newProduct
            }
        )
    }
    catch(error){
        console.log("Error:", error);
        
         res.status(201).json(
            {
                status : "Error",
                message : "Failed to add New Product "
            }
        )
    }
})

router.get('/list', async(req,res) => {
    try{
        const products = await Product.find();
        res.status(201).json(
            {
                status : "Success",
                message : "Product details fetched",
                products
            }
        )
    }
    catch(error){
         res.status(401).json(
            {
                status : "Failed",
                message : "Product details failed to fetched",
                error : error.message
            }
        )
        
    }
})
module.exports = router;