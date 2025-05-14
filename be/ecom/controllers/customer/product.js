const {
  fetchAllProducts,
  searchProduct,
  fetchProductById,
} = require('../../services/customer/product');

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

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await fetchProductById(productId);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getAllProducts,
  searchProductByName,
  getProductById,
};
