const {
  postProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  searchProductByName,
} = require('../../controllers/admin/product');
const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const multer = require('multer');
const express = require('express');
const upload = multer();

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRole('ADMIN'),
  upload.single('img'),
  postProduct
);

router.put(
  '/:productId',
  authenticateJWT,
  authorizeRole('ADMIN'),
  upload.single('img'),
  updateProduct
);

router.delete(
  '/:productId',
  authenticateJWT,
  authorizeRole('ADMIN'),
  deleteProduct
);

router.get(
  '/:productId',
  authenticateJWT,
  authorizeRole('ADMIN'),
  getProductById
);

router.get('/', authenticateJWT, authorizeRole('ADMIN'), getAllProducts);

router.get(
  '/search/:name',
  authenticateJWT,
  authorizeRole('ADMIN'),
  searchProductByName
);

module.exports = router;
