const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cart: {
      products: { type: Array, required: true },
      totalPrice: { type: Number, required: true },
    },
    receiver: {
      type: Object,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
