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

        const productDetails = products.map(item => {
            const product = Product.findById(item.productID);

            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        })


        const sellerID = productDetails[0].sellerID;

        const amount = productDetails.reduce(
            (total, product, index) => {
                return total + (product.price * products[index].quantity);
            }, 0);

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

router.get('/list', authMiddleWear, async (req, res) => {
    try {
        const userid = req.user.userID;

        const user = await User.findById(userid);

        let orders;

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        if (user.userType === 'seller') {
            orders = await Order.find({ sellerID: userid })
                .populate('customerID', 'name email')
                .populate('sellerID', 'name email')
                .populate('products.productID', 'productName price');
        }

        if (user.userType === 'customer') {
            orders = await Order.find({
                customerID: userid
            })
                .populate('sellerID', 'name email')
                .populate('products.productID', 'productName price');
        }

        return res.status(200).json({
            status: "Success",
            count: orders.length,
            orders: orders
        });

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch orders"
        });
    }
});
module.exports = router;