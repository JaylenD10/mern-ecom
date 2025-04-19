const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  deleteProductById,
  updateProductById,
  searchProduct,
} = require('../../services/admin/product');

const postProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.img = req.file.buffer;
    }
    const product = await createProduct(productData);
    res.status(201).json({
      message: 'Product posted successfully!',
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await deleteProductById(productId);
    res.status(200).send();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await fetchProductById(productId);
    if (!product)
      return res.status(404).json({ message: `Product not found!` });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    if (req.file) {
      productData.img = req.file.buffer;
    }
    const product = await updateProductById(productId, productData);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const searchProductByName = async (req, res) => {
  try {
    const name = req.params.name;
    const products = await searchProduct(name);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  searchProductByName,
};
