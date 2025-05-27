const { getReviewOnProduct } = require('../../services/customer/review');

const giveReview = async (req, res) => {
  try {
    const reviewData = { ...req.body, user: req.user.userId };
    if (req.file) {
      reviewData.img = req.file.buffer;
    }
    const review = await getReviewOnProduct(reviewData);
    res.status(201).json({
      message: 'Review published successfully!',
      review,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { giveReview };
