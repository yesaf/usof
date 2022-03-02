const Category = require('../models/category');
const { checkValidId } = require('../utils/validation');

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
  if (!checkValidId(categoryId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const [category] = await Category.findById({ id: categoryId });
  response.json({
    category
  });
};

module.exports.update = async (request, response) => {
  const { categoryId } = request.params;
  if (!checkValidId(categoryId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const { title, description } = request.body;
  const [category] = await Category.update({ category_id: categoryId, new_title: title, new_description: description });
  response.json({
    category
  });
};

module.exports.remove = async (request, response) => {
  const { categoryId } = request.params;
  if (!checkValidId(categoryId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const result = await Category.delete({ id: categoryId });
  response.json({
    result
  });
};

module.exports.getCategoryPosts = async (request, response) => {
  const { categoryId } = request.params;
  const categories = await Category.getAllPosts({ category_id: categoryId });
  response.json({
    categories
  });
};
