var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productsSchema = new Schema({
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
})


var ordersSchema = new Schema({
    orderid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shippingaddress: {
        type: String,
        required: true
    },
    ordersplaced: [{
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
})

const products = mongoose.model("products",productsSchema)
const orders = mongoose.model("orders",ordersSchema)
module.exports = {products, orders}