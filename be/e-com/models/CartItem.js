const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
