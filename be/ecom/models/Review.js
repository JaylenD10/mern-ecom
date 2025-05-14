const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: Buffer,
      ref: 'Product',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
