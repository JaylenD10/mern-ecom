const {
  addProductToWishlist,
  fetchWishlistProducts,
} = require('../../services/customer/wishlist');

const postProductToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const response = await addProductToWishlist(userId, productId);
    res.status(response.status).json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getWishlistProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const response = await fetchWishlistProducts(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { postProductToWishlist, getWishlistProducts };
