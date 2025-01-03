const express = require('express')
const router = express.Router()
var productsController = require('../src/products/productsController')

router.route('/api/products').get(productsController.fetchProductsControllerFn)
router.route('/api/orders').get(productsController.fetchOrdersControllerFn)
router.route('/api/products/create').post(productsController.createProductsControllerFn)
router.route('/api/orders/create').post(productsController.createOrdersControllerFn)

module.exports = router