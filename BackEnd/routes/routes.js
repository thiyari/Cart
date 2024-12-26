const express = require('express')
const router = express.Router()
var productsController = require('../src/products/productsController')

router.route('/products/create').post(productsController.createProductsControllerFn)

module.exports = router