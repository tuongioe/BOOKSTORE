const express = require('express');
const { body } = require('express-validator');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/order', isAuth, shopController.getOrders);

router.post('/order', isAuth, shopController.postOrder);

module.exports = router;
