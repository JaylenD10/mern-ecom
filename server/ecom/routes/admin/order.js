const {
  getOrders,
  updateOrderStatus,
} = require('../../controllers/admin/order');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.get('/', authenticateJWT, authorizeRole('ADMIN'), getOrders);

router.post('/', authenticateJWT, authorizeRole('ADMIN'), updateOrderStatus);

module.exports = router;
