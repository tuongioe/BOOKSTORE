const fs = require('fs');
const path = require('path');

const uploadToS3 = require('../utils/uploadToS3');
const getImageUrl = require('../utils/getImageUrl');

const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });

    products = await Promise.all(
      products.map(async (product) => {
        let key = product.imageUrl;
        product.imageUrl = await getImageUrl({ key });
        return product;
      })
    );

    res.status(200).json({
      message: 'Fetched products successfully',
      products: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Could not find product.');
      error.statusCode = 404;
      throw error;
    }
    let key = product.imageUrl;
    product.imageUrl = await getImageUrl({ key });

    res.status(200).json({ message: 'Product fetched', product: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const file = req.file;
  const { key, error } = await uploadToS3({ file });

  const imageUrl = key;

  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const oldprice = req.body.oldprice;
  const saleoff = req.body.saleoff;
  const newprice = req.body.price;
  const product = new Product({
    title: title,
    author: author,
    category: category,
    imageUrl: key,
    oldprice: oldprice,
    price: newprice,
    saleoff: saleoff,
    imageKey: key,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Post created successfully!',
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const author = req.body.author;
  const category = req.body.category;
  const oldprice = req.body.oldprice;
  const saleoff = req.body.saleoff;
  const newprice = req.body.price;
  let imageUrl = req.body.image;

  if (req.file) {
    const file = req.file;
    const { key, error } = await uploadToS3({ file });
    imageUrl = key;
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      if (!imageUrl) {
        imageUrl = product.imageUrl;
      }
      // if (imageUrl !== product.imageUrl) {
      //   clearImage(product.imageUrl);
      // }
      product.title = title;
      product.imageUrl = imageUrl;
      product.oldprice = oldprice;
      product.price = newprice;
      product.saleoff = saleoff;
      product.category = category;
      product.author = author;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Product updated!', product: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      return Product.findByIdAndRemove(productId);
    })
    .then((result) => {
      res.status(200).json({ message: 'Deleted product.' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
