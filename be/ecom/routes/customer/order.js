const { placeOrder } = require('../../controllers/customer/order');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole('CUSTOMER'), placeOrder);

module.exports = router;
