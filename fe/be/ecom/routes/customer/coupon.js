const { applyCoupon } = require('../../controllers/customer/coupon');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.get('/:code', authenticateJWT, authorizeRole('CUSTOMER'), applyCoupon);

module.exports = router;
