const mongoose = require('mongoose');
const User = require('./user');

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required = true
        },
        seller : {
            type : mongoose.Schema.Types.ObjectId,
            reference : 'User',
            required = true
        },
        inventoryCount : {
            type : Number,
            required = true
        },
        itemSold : {
            type : Number,
            default : 0,
            required = true
        },
        productImg : {
            typwe : String,
            required = true
        },
        isActive : {
            type : Boolean,
            default : true
        },
    },
    {timestamps : true}
);

const Product = mongoose.model('Product', productSchema);
