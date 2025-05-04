const {
  authenticateJWT,
  authorizeRole,
} = require('../../middlewares/authMiddleware');
const multer = require('multer');
const express = require('express');
const { giveReview } = require('../../controllers/customer/review');
const upload = multer();

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRole('CUSTOMER'),
  upload.single('img'),
  giveReview
);

module.exports = router;
