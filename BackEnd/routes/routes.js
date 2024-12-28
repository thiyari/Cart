const express = require('express')
const router = express.Router()
var productsController = require('../src/products/productsController')

router.route('/api/products').get(productsController.fetchProductsControllerFn)
router.route('/api/products/create').post(productsController.createProductsControllerFn)
module.exports = router