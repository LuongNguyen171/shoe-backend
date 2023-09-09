const express = require('express')
const router = express.Router();

const productController = require('../controllers/product.controller.js')
const ProductImageController = require('../controllers/product_Image.controller')

router.get('/getProducts', productController.getProducts);

router.get('/getProductById/:productId', productController.getProductById);

router.get('/getProductByStyleId/:styleId', productController.getProductByStyleId);

router.get('/getProductImageById/:productId', ProductImageController.getProductImageById);

router.get('/top10ProductSoldOut', productController.getTop10ProductsSoldOut)

router.get('/top10HighestPrice', productController.getTop10HighestPrice)

module.exports = router