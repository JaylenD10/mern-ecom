const {
  postProductToWishlist,
  getWishlistProducts,
} = require('../../controllers/customer/wishlist');
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
  postProductToWishlist
);

router.get(
  '/:productId',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  getWishlistProducts
);

module.exports = router;
