const express = require('express');
const { body } = require('express-validator');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProduct);

router.post('/post-product', productController.createProduct);

router.put('/update-product/:productId', productController.updateProduct);

router.delete('/delete-product/:productId', productController.deleteProduct);

module.exports = router;
