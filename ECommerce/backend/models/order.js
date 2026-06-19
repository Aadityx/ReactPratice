const mongoose = require('mongoose');
const User = require('./user');

const orderSchema = new mongoose.Schema(
    {
        customerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sellerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                productID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity : {
                    type : Number,
                    required : true
                }
            }
        ],
        amount : {
            type : Number,
            required : true
        },
        status : {
            type : String,
            enum : ['pending', 'shipped', 'delivered'],
            def : 'pending'
        },
        orderDate : {
            type : Date,
            def : Date.now
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;