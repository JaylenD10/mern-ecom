const Order = require('../../models/Order');

const fetchOrders = async () => {
  const orders = await Order.find({
    orderStatus: { $in: ['PLACED', 'SHIPPED', 'DELIVERED'] },
  }).populate('user');

  if (orders.length < 0) return { status: 404, data: 'Orders not found' };

  return { status: 200, data: orders };
};

const changeOrderStatus = async (id, status) => {
  const activeOrder = await Order.findById(id);

  if (!activeOrder) return { status: 404, data: 'Order not found' };

  activeOrder.orderStatus = status;
  activeOrder.save();

  return { status: 200, data: activeOrder };
};

module.exports = { fetchOrders, changeOrderStatus };
