const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail này đã tồn tại');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('name').trim().not().isEmpty(),
    body('rePassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Nhập lại mật khẩu sai');
        }
        return true;
      }),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
  ],
  authController.login
);

router.get('/user', isAuth, authController.getUser);

module.exports = router;
