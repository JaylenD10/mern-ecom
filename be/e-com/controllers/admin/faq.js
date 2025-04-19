const { createFAQ } = require('../../services/admin/faq');

const postFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const productId = req.params.productId;
    const faq = await createFAQ(question, answer, productId);
    res.status(201).json({
      message: 'FAQ posted successfully!',
      faq,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { postFAQ };
