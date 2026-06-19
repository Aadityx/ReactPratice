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

router.put('/update/:id', authMiddleWear, async(req,res) => {
    console.log("User Info : ", user);
    const {productName, description, price, inventoryCount, productImage } = req.body;
    try{
        const product = await Product.findById(req.params.id);
        if (!product){
            res.status(404),json(
                {
                    status : "Not Found",
                    message : "product not found"
                }
            )
        }
        //check if user is the seller of the product
        if (product.sellerID.toString() !== req.user.userID){
            res.status(404),json(
                {
                    status : "Unauthorized",
                    message : "Cannot update product details"
                }
            ) 
        }
        product.productName = productName || product.productName;
        product.description = description || product.description;
        product.price = price || product.price;
        product.inventoryCount = inventoryCount || product.inventoryCount;
        product.productImage = productImage || product.productImage;

        const updatedProduct = await product.save();
       res.status(201),json(
                {
                    status : "Success",
                    message : "Updated product details",
                    product : updatedProduct
                }
            ) 
    }
    
})
module.exports = router;