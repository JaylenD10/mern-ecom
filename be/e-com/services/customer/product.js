const Product = require('../../models/Product');

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

module.exports = {
  fetchAllProducts,
  searchProduct,
};
