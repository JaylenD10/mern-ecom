const {
  postCategory,
  fetchCategories,
} = require('../../controllers/admin/category');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole('ADMIN'), postCategory);

router.get('/', authenticateJWT, authorizeRole('ADMIN'), fetchCategories);

module.exports = router;
