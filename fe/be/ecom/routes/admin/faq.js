const { postFAQ } = require('../../controllers/admin/faq');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/:productId', authenticateJWT, authorizeRole('ADMIN'), postFAQ);

module.exports = router;
