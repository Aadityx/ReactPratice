const express = require('express');
const authMiddleWear = require('./authMiddleWear');
const router = express.Router();
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');

router.post('/create', authMiddleWear, async (req, res) => {
    try {

        const { products } = req.body;

        const customerID = req.user.userID;

        const customer = await User.findById(customerID);

        if (!customer) {
            return res.status(404).json({
                status: "Error",
                message: "Customer not found"
            });
        }

        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.productID);

                if (!product) {
                    throw new Error("Product not found");
                }
                return product;
            })
        );

        const sellerID = productDetails[0].sellerID;

        const amount = productDetails.reduce(
            (total, product, index) =>
                total + product.price * products[index].quantity,
            0
        );

        const order = new Order({
            customerID: customerID,
            sellerID,
            products: products.map(item => ({
                productID: item.productID,
                quantity: item.quantity
            })),
            amount
        });

        const newOrder = await order.save();

        res.status(201).json({
            status: "Success",
            message: "Order Created",
            order: newOrder
        });

    } catch (error) {

        console.log("Error:", error);

        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
});

module.exports = router;