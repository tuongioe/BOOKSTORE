const Order = require('../models/order');
const getImageUrl = require('../utils/getImageUrl');

exports.postOrder = (req, res, next) => {
  const products = req.body.cart.products;
  const totalPrice = req.body.cart.totalPrice;
  const receiver = req.body.receiver;
  const userId = req.userId;

  const order = new Order({
    cart: {
      products: products,
      totalPrice: totalPrice,
    },
    receiver: receiver,
    userId: userId,
  });
  return order
    .save()
    .then((result) => {
      res.status(200).json({ message: 'Order posted' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await Order.find({ userId: req.userId })
      .select('-userId')
      .sort({
        createdAt: -1,
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
