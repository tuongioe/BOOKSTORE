const Order = require('../models/order');
const getImageUrl = require('../utils/getImageUrl');

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await Order.find({ isDelivered: false }).sort({
      createdAt: 1,
    });

    if (orders) {
      try {
        orders = await Promise.all(
          orders.map(async (order) => {
            order.cart.products = await Promise.all(
              order.cart.products.map(async (product) => {
                let key = product.imageKey;
                product.imageUrl = await getImageUrl({ key });
                return product;
              })
            );
            return order;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    console.log(orders);
    res.status(200).json({
      message: 'Fetched orders successfully',
      orders: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      order.isDelivered = true;
      return order.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Update order successfully',
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
