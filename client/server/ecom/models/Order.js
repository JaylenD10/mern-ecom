const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderDescription: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['PENDING', 'PLACED', 'SHIPPED', 'DELIVERED'],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    trackingId: {
      type: String,
      default: () => require('uuid').v4(),
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      required: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
