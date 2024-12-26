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

const products = mongoose.model("products",productsSchema)

module.exports = {products}