const {
  getAllProducts,
  searchProductByName,
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

module.exports = router;
