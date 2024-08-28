const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/orders', adminController.getOrders);
router.put('/update-order/:orderId', adminController.updateOrder);

module.exports = router;
