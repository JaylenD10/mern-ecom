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

const fetchAnalytics = async () => {
  const currentDate = new Date();
  const currentMonthStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const nextMonthStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

  const previousMonthStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const previousMonthEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    1
  );

  const currentMonthOrders = await Order.countDocuments({
    createdAt: { $gte: currentMonthStartDate, $lt: nextMonthStartDate },
  });
  const previousMonthOrders = await Order.countDocuments({
    createdAt: { $gte: previousMonthStartDate, $lt: previousMonthEndDate },
  });

  const placed = await Order.countDocuments({ orderStatus: 'PLACED' });
  const shipped = await Order.countDocuments({ orderStatus: 'SHIPPED' });
  const delivered = await Order.countDocuments({ orderStatus: 'DELIVERED' });

  const currentMonthEarnings = await Order.aggregate([
    {
      $match: {
        createdAt: $gte,
        currentMonthStartDate,
        $lte: nextMonthStartDate,
      },
    },
    { $group: { _id: null, totalEarnings: { $sum: '$totalAmount' } } },
  ]);

  const previousMonthEarnings = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonthStartDate, $lt: previousMonthEndDate },
      },
    },
    { $group: { _id: null, totalEarnings: { $sum: '$totalAmount' } } },
  ]);

  return {
    status: 200,
    date: {
      placed,
      shipped,
      delivered,
      currentMonthOrders,
      previousMonthOrders,
      currentMonthEarnings:
        currentMonthEarnings.length > 0
          ? currentMonthEarnings[0].totalEarnings
          : 0,
      previousMonthEarnings:
        previousMonthEarnings.length > 0
          ? previousMonthEarnings[0].totalEarnings
          : 0,
    },
  };
};

module.exports = { fetchOrders, changeOrderStatus, fetchAnalytics };
