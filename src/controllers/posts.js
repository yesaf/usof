const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

const Post = require('../models/post');

module.exports.getAll = async (request, response) => {
  const posts = await Post.getAllPosts();

  for (const post of posts) {
    post.categories = await Post.getAllCategories(post.post_id);
  }

  response.json({
    posts
  });
};

module.exports.create = async (request, response) => {
  const { title, content, categories } = request.body;
  if (!title) {
    return response.json({
      type: "error",
      msg: "Title not filled"
    });
  }
  if (!content) {
    return response.json({
      type: "error",
      msg: "Content not filled"
    });
  }
  const [, token] = request.headers['authorization'].split(' ');
  const user = jwt.verify(token, keys.jwt);
  const result = await Post.createNewPost({ author_id: user.id, title, content, categories });

  response.json({
    result
  });
};

module.exports.getPost = async (request, response) => {
  const { postId } = request.params;
  const [post] = await Post.findPostById(postId);

  response.json({
    post
  });
};

module.exports.updatePost = async (request, response) => {
  const { postId } = request.params;
  const { title, content, categories } = request.body;
  const result = await Post.updatePost({ post_id: postId, new_title: title, new_categories: content, new_content: categories })
  response.json({
    result
  });
};

module.exports.deletePost = async (request, response) => {
  const { postId } = request.params;
  const result = await Post.deletePost(postId)
  response.json({
    result
  });
};

module.exports.getAllComments = (request, response) => {
  response.json({
    post: {}
  });
};

module.exports.createComment = async (request, response) => {
  const { content } = request.body;
  const { postId } = request.params;
  const [, token] = request.headers['authorization'].split(' ');
  const user = jwt.verify(token, keys.jwt);
  const result = await Post.createNewComment({ author_id: user.id, post_id: postId, content });

  response.json({
    post: {}
  });
};

module.exports.getAllCategories = (request, response) => {
  response.json({
    post: {}
  });
};

module.exports.getAllLikes = (request, response) => {
  response.json({
    post: {}
  });
};

module.exports.like = (request, response) => {
  response.json({
    post: {}
  });
};

module.exports.unlike = (request, response) => {
  response.json({
    post: {}
  });
};
