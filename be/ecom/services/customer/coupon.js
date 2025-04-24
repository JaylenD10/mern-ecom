const Order = require('../../models/Order');
const Coupon = require('../../models/Coupon');

const applyACoupon = async (userId, code) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  });
  const coupon = await Coupon.findOne({ code });

  if (!activeOrder && coupon)
    return { status: 404, data: 'Active order and coupon not found' };

  if (couponIsExpired(coupon))
    return { status: 404, data: 'Coupon has expired.' };

  const discountAmount = (coupon.discount / 100) * activeOrder.totalAmount;
  const netAmount = activeOrder.totalAmount - discountAmount;

  activeOrder.amount = Math.round(netAmount);
  activeOrder.discount = Math.round(discountAmount);
  activeOrder.coupon = coupon;

  await activeOrder.save();

  return { status: 200, data: activeOrder };
};

const couponIsExpired = (coupon) => {
  const currentDate = new Date();
  const expirationDate = coupon.expirationDate;
  return expirationDate != null && currentDate > expirationDate;
};

module.exports = { applyACoupon, couponIsExpired };
