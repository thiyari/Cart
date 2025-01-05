var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productsSchema = new Schema({
    pid:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true    
    }],
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


var ordersSchema = new Schema({
    orderid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    shippingaddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    ordersplaced: [{
        pid: {
            type: Number,
            rquired: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total: {
            type: String,
            required: true
        }
    }],
    grandtotal: {
        type: String,
        required: true
    },
    paymentstatus: {
        type: String,
        required: true
    }
},{
    timestamps: true
});



const products = mongoose.model("products",productsSchema)
const orders = mongoose.model("orders",ordersSchema)
module.exports = {products, orders}