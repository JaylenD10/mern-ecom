const {
  getAllProducts,
  searchProductByName,
  getProductById,
} = require('../../controllers/customer/product');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const multer = require('multer');
const express = require('express');
const upload = multer();

const router = express.Router();

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getAllProducts);

router.get(
  '/search/:name',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  searchProductByName
);

router.get(
  '/:productId',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  getProductById
);

module.exports = router;
