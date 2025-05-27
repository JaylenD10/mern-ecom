const Product = require('../../models/Product');
const Review = require('../../models/Review');
const FAQ = require('../../models/FAQ');

const fetchAllProducts = async () => {
  const products = await Product.find().populate('category');
  return products.map((product) => ({
    ...product._doc,
    img: product.img ? product.img.toString('base64') : null,
  }));
};

const searchProduct = async (name) => {
  const products = await Product.find({
    name: { $regex: name, $options: 'i' },
  });
  return products.map((product) => ({
    ...product._doc,
    img: product.img ? product.img.toString('base64') : null,
  }));
};

const fetchProductById = async (productId) => {
  const product = await Product.findById(productId).populate('category');
  if (!product) {
    return { status: 404, data: 'No product found' };
  }
  const faqs = await FAQ.find({ product: productId });
  const reviewsWithoutBase64 = await Review.find({
    product: productId,
  }).populate('user');

  const reviews = reviewsWithoutBase64.map((review) => ({
    ...review._doc,
    img: review.img ? review.img.toString('base64') : null,
  }));
  const imgBase64 = product.img ? product.img.toString('base64') : null;

  return {
    status: 200,
    data: { product: { ...product._doc, img: imgBase64 }, faqs, reviews },
  };
};

module.exports = {
  fetchAllProducts,
  searchProduct,
  fetchProductById,
};
