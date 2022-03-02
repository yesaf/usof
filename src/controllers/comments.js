const Comment = require('../models/comment');
const Post = require('../models/post');
const { getUserJWT } = require('../utils/utils');
const { checkValidId } = require('../utils/validation');

module.exports.getComment = async (request, response) => {
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

module.exports.update = async (request, response) => {
  const { commentId } = request.params;
  if (!checkValidId(commentId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const { content } = request.body;

  if (!content) {
    return response.json({
      type: 'error',
      msg: 'Content not filled'
    });
  }

  const user = getUserJWT(request.headers['authorization']);
  const result = await Comment.update({ user_id: user.id, comment_id: commentId, content });

  response.json({
    result
  });
};

module.exports.remove = async (request, response) => {
  const { commentId } = request.params;
  if (!checkValidId(commentId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }
  const user = getUserJWT(request.headers['authorization']);
  const result = await Comment.delete({ user_id: user.id, comment_id: commentId });
  response.json({
    result
  });
};

module.exports.getLikes = async (request, response) => {
  const { commentId } = request.params;
  if (!checkValidId(commentId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const likes = await Comment.getAllLikes({ comment_id: commentId });
  response.json({
    likes
  });
};

module.exports.like = async (request, response) => {
  const { commentId } = request.params;
  if (!checkValidId(commentId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const { type } = request.body;
  if (type !== 'like' || type !== 'dislike') {
    return response.json({
      type: 'error',
      msg: 'Like not filled'
    });
  }

  const user = getUserJWT(request.headers['authorization']);
  const result = await Comment.createNewLike({ comment_id: commentId, type, author_id: user.id });
  response.json({
    result
  });
};

module.exports.unlike = async (request, response) => {
  const { commentId } = request.params;
  if (!checkValidId(commentId)) {
    return response.json({
      type: 'error',
      msg: 'Invalid parameters'
    });
  }

  const user = getUserJWT(request.headers['authorization']);
  const result = await Comment.deleteLike({ author_id: user.id, comment_id: commentId });
  response.json({
    result
  });
};
