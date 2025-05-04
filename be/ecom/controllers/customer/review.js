const { getReviewOnProduct } = require('../../services/customer/review');

const giveReview = async (req, res) => {
  try {
    const reviewData = req.body;
    if (req.file) {
      reviewData.img = req.file.buffer;
    }
    const review = await getReviewOnProduct(reviewData);
    res.status(201).json({
      message: 'Review published successfully!',
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { giveReview };
