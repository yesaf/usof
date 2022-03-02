const Post = require('../models/post');
const { checkValidId } = require('../utils/validation');
const { getUserJWT } = require('../utils/utils');

module.exports.getAll = async (request, response) => {
  const posts = await Post.getAll();

  for (const post of posts) {
    post.categories = await Post.getAllCategories({ post_id: post.post_id });
  }

  response.json({
    posts
  });
};

module.exports.create = async (request, response) => {
  const { title, content, categories } = request.body;
  if (!title) {
    return response.json({
      type: 'error',
      msg: 'Title not filled'
    });
  }
  if (!content) {
    return response.json({
      type: 'error',
      msg: 'Content not filled'
    });
  }
  const user = getUserJWT(request.headers['authorization']);
  const result = await Post.createNew({ author_id: user.id, title, content, categories });

  response.json({
    result
  });
};

module.exports.getPost = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const [post] = await Post.findById({ id: postId });

  response.json({
    post
  });
};

module.exports.updatePost = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const { title, content, categories = [] } = request.body;

  if (!title) {
    return response.json({
      type: 'error',
      msg: 'Title not filled'
    });
  }

  if (!content) {
    return response.json({
      type: 'error',
      msg: 'Content not filled'
    });
  }

  const user = getUserJWT(request.headers['authorization']);

  const result = await Post.update({
    post_id: postId,
    new_title: title,
    new_categories: categories,
    new_content: content,
    user_id: user.id
  });
  response.json({
    result
  });
};

module.exports.deletePost = async (request, response) => {
  const { postId } = request.params;

  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const result = await Post.delete({ id: postId });
  response.json({
    result
  });
};

module.exports.getAllComments = async (request, response) => {
  const { postId } = request.params;

  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const comments = await Post.getAllComments({ post_id: postId });
  response.json({
    comments
  });
};

module.exports.createComment = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const { content } = request.body;
  const user = getUserJWT(request.headers['authorization']);
  const result = await Post.createNewComment({ author_id: user.id, post_id: postId, content });

  response.json({
    result
  });
};

module.exports.getAllCategories = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const [comments] = await Post.getAllCategories({ post_id: postId });

  response.json({
    comments
  });
};

module.exports.getAllLikes = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const [likes] = await Post.getAllLikes({ post_id: postId });
  response.json({
    likes
  });
};

module.exports.like = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const user = getUserJWT(request.headers['authorization']);

  const { type } = request.body;
  const result = await Post.createNewLike({ author_id: user.id, post_id: postId, type });
  response.json({
    result
  });
};

module.exports.unlike = async (request, response) => {
  const { postId } = request.params;
  if (!checkValidId(postId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const user = getUserJWT(request.headers['authorization']);
  const result = await Post.deleteLike({ author_id: user.id, post_id: postId });
  response.json({
    result
  });
};
