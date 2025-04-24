const { placeTheOrder } = require('../../services/customer/order');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { orderDescription, address } = req.body;
    const response = await placeTheOrder(userId, orderDescription, address);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { placeOrder };
