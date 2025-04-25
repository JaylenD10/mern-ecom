const {
  fetchOrders,
  changeOrderStatus,
} = require('../../services/admin/order');

const getOrders = async (req, res) => {
  try {
    const response = await fetchOrders();
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const response = await changeOrderStatus(id, status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getOrders, updateOrderStatus };
