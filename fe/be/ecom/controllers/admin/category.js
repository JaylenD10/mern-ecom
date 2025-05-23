const {
  createCategory,
  getCategories,
} = require('../../services/admin/category');

const postCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await createCategory(name, description);
    res.status(201).json({
      message: 'Category posted successfully!',
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { postCategory, fetchCategories };
