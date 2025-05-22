const Order = require('../../models/Order');
const User = require('../../models/User');

const placeTheOrder = async (userId, orderDescription, address) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  });
  const user = await User.findById(userId);

  if (!activeOrder || !user)
    return { status: 404, data: 'Active order or user not found' };

  activeOrder.orderDescription = orderDescription;
  activeOrder.address = address;
  activeOrder.orderStatus = 'PLACED';

  await activeOrder.save();

  const newOrder = new Order({
    amount: 0,
    totalAmount: 0,
    discount: 0,
    orderStatus: 'PENDING',
    address: 'Default address',
    user: user,
  });

  await newOrder.save();

  return { status: 200, data: newOrder._id };
};

const getOrdersByUser = async (userId) => {
  const orders = await Order.find({
    user: userId,
    orderStatus: { $in: ['PLACED', 'SHIPPED', 'DELIVERED'] },
  });

  if (orders.length < 0) return { status: 404, data: 'Orders not found' };

  return { status: 200, data: orders };
};

const getOrdersByTrackingId = async (trackingId) => {
  return await Order.findOne({
    trackingId,
  }).populate('user');
};

const getOrderedProducts = async (orderId) => {
  const order = await Order.findById(orderId).populate({
    path: 'cartItem',
    populate: { path: 'product' },
  });

  if (!order) return { status: 404, data: 'Order not found' };

  const orderedProducts = order.cartItem.map((item) => {
    return {
      ...item.product._doc,
      img: item.product.img ? item.product.img.toString('base64') : null,
    };
  });

  return { status: 200, data: orderedProducts };
};

module.exports = {
  placeTheOrder,
  getOrdersByUser,
  getOrdersByTrackingId,
  getOrderedProducts,
};
