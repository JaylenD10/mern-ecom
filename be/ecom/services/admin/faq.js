const FAQ = require('../../models/FAQ');

const createFAQ = async (question, answer, productId) => {
  const newFAQ = new FAQ({ question, answer, product: productId });
  await newFAQ.save();
  return newFAQ;
};

module.exports = { createFAQ };
