const Category = require('../models/category');

module.exports.getAll = async (request, response) => {
  const categories = await Category.getAll();
  response.json({
    categories
  });
};

module.exports.create = async (request, response) => {
  const { title, description } = request.body;

  const [category] = await Category.createNew({ title, description });
  response.json({
    category
  });
};

module.exports.getOne = async (request, response) => {
  const { categoryId } = request.params;
  const [category] = await Category.findById({ id: categoryId });
  response.json({
    category
  });
};

module.exports.update = async (request, response) => {
  const { categoryId } = request.params;
  const { title, description } = request.body;
  const [category] = await Category.update({ category_id: categoryId , new_title: title, new_description: description});
  response.json({
    category
  });
};

module.exports.remove = async (request, response) => {
  const { categoryId } = request.params;
  const result = await Category.delete({ id: categoryId });
  response.json({
    result
  });
};

module.exports.getCategoryPosts = async (request, response) => {
  response.json({
    categories: {}
  });
};
