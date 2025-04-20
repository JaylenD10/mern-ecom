const {
  fetchAllProducts,
  searchProduct,
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

module.exports = {
  getAllProducts,
  searchProductByName,
};
