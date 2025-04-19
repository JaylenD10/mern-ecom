const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
