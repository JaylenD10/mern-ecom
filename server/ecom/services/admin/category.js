const Category = require('../../models/Category');

const createCategory = async (name, description) => {
  const newCategory = new Category({ name, description });
  await newCategory.save();
  return newCategory;
};

const getCategories = async () => {
  return await Category.find({});
};

module.exports = { createCategory, getCategories };
