require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createAdminAccount = require('./utils/createAdminAccount.js');
const authRoute = require('./routes/auth/auth.js');
const categoryRoute = require('./routes/admin/category.js');
const productRoute = require('./routes/admin/product.js');
const customerProductRoute = require('./routes/customer/product.js');
const faqRoute = require('./routes/admin/faq.js');
const couponRoute = require('./routes/admin/coupon.js');
const orderRoute = require('./routes/admin/order.js');
const customerCartRoute = require('./routes/customer/cart.js');
const customerCouponRoute = require('./routes/customer/coupon.js');
const customerOrderRoute = require('./routes/customer/order.js');
const customerWishlistRoute = require('./routes/customer/wishlist.js');
const customerReviewRoute = require('./routes/customer/review.js');

const app = express();

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;
const corsorigin = process.env.CORS_ORIGIN;

const corsOption = {
  origin: corsorigin,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminAccount();
  })
  .catch((err) => {
    console.log('MongoDB connection error ', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Auth Routes
app.use('/api/auth', authRoute);

// Admin Routes
app.use('/api/admin/category', categoryRoute);
app.use('/api/admin/product', productRoute);
app.use('/api/admin/faq', faqRoute);
app.use('/api/admin/coupon', couponRoute);
app.use('/api/admin/order', orderRoute);

// Customer Routes
app.use('/api/customer/product', customerProductRoute);
app.use('/api/customer/cart', customerCartRoute);
app.use('/api/customer/coupon', customerCouponRoute);
app.use('/api/customer/order', customerOrderRoute);
app.use('/api/customer/wishlist', customerWishlistRoute);
app.use('/api/customer/review', customerReviewRoute);
