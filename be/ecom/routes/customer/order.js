const { placeOrder, getOrders } = require('../../controllers/customer/order');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');
const {
  fetchOrderByTrackingId,
  fetchOrderedProducts,
} = require('../../controllers/admin/order');

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole('CUSTOMER'), placeOrder);

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getOrders);

router.get('/search/:trackingId', fetchOrderByTrackingId);

router.get(
  '/products/:id',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  fetchOrderedProducts
);

module.exports = router;
