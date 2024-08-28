const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    saleoff: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldprice: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
