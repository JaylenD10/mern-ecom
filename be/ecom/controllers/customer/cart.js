const {
  addProductToCart,
  fetchCartByUser,
  increaseTheProductQuantity,
  decreaseTheProductQuantity,
} = require('../../services/customer/cart');

const postProductToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const response = await addProductToCart(userId, productId);
    res.status(response.status).json({
      message: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCartByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const response = await fetchCartByUser(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const increaseProductQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const response = await increaseTheProductQuantity(userId, productId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const decreaseProductQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const response = await decreaseTheProductQuantity(userId, productId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  postProductToCart,
  getCartByUser,
  increaseProductQuantity,
  decreaseProductQuantity,
};
