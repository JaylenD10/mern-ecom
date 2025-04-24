const { applyACoupon } = require('../../services/customer/coupon');

const applyCoupon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { code } = req.params;
    const response = await applyACoupon(userId, code);
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

module.exports = { applyCoupon };
