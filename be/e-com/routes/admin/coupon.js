const { createCoupon, getCoupons } = require('../../controllers/admin/coupon');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole('ADMIN'), createCoupon);

router.get('/', authenticateJWT, authorizeRole('ADMIN'), getCoupons);

module.exports = router;
