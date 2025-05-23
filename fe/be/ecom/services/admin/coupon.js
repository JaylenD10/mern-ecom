const Coupon = require('../../models/Coupon');

const postCoupon = async (name, code, discount, expiredAt) => {
  const newCoupon = new Coupon({ name, code, discount, expiredAt });
  await newCoupon.save();
  return newCoupon;
};

const fetchCoupons = async () => {
  return await Coupon.find();
};

module.exports = { postCoupon, fetchCoupons };
