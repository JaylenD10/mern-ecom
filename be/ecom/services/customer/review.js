const Review = require('../../models/Review');

const getReviewOnProduct = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

module.exports = { getReviewOnProduct };
