const Product = require('../../models/Product');

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};

const updateProductById = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

const fetchAllProducts = async () => {
  const products = await Product.find().populate('category');
  return products.map((product) => ({
    ...product._doc,
    img: product.img ? product.img.toString('base64') : null,
  }));
};

const fetchProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate('category');
    if (product) {
      return {
        ...product._doc,
        img: product.img ? product.img.toString('base64') : null,
      };
    }
    return null;
  } catch (error) {
    throw new Error('Error fetching product!');
  }
};

const deleteProductById = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error('Error deleting product');
  }
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
  createProduct,
  fetchAllProducts,
  fetchProductById,
  deleteProductById,
  updateProductById,
  searchProduct,
};
