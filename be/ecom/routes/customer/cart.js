const {
  postProductToCart,
  getCartByUser,
  increaseProductQuantity,
  decreaseProductQuantity,
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

router.post(
  '/increase/:productId',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  increaseProductQuantity
);

router.post(
  '/decrease/:productId',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  decreaseProductQuantity
);

module.exports = router;
