const { postCoupon, fetchCoupons } = require('../../services/admin/coupon');

const createCoupon = async (req, res) => {
  try {
    const { name, code, discount, expiredAt } = req.body;
    const coupon = await postCoupon(name, code, discount, expiredAt);
    res.status(201).json({
      message: 'Coupon posted successfully!',
      coupon,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await fetchCoupons();
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { createCoupon, getCoupons };
