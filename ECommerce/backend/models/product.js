const mongoose = require('mongoose');
const User = require('./user');

const productSchema = new mongoose.Schema(
    {
        productName : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        sellerID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        inventoryCount : {
            type : Number,
            required : true
        },
        itemSold : {
            type : Number,
            default : 0
        },
        productImage : {
            type : String,
            required : true
        },
        isActive : {
            type : Boolean,
            default : true
        },
    },
    {timestamps : true}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;