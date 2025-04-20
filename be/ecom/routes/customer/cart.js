const {
  postProductToCart,
  getCartByUser,
} = require('../../controllers/customer/cart');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post(
  '/:productId',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  postProductToCart
);

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getCartByUser);

module.exports = router;
