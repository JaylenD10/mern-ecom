const {
  fetchOrders,
  changeOrderStatus,
} = require('../../services/admin/order');
const {
  getOrdersByTrackingId,
  getOrderedProducts,
} = require('../../services/customer/order');

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

const fetchOrderByTrackingId = async (req, res) => {
  try {
    const trackingId = req.params.trackingId;
    const order = await getOrdersByTrackingId(trackingId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const fetchOrderedProducts = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await getOrderedProducts(orderId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  updateOrderStatus,
  fetchOrderByTrackingId,
  fetchOrderedProducts,
};
