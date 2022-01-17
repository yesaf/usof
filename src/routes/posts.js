const { Router } = require('express');
const controller = require('../controllers/posts');
const router = new Router();

router.get('/', controller.getAll);
router.post('/', controller.create);

router.get('/:postId', controller.getPost);
router.patch('/:postId', controller.updatePost);
router.delete('/:postId', controller.deletePost);

router.get('/:postId/comments', controller.getAllComments);
router.post('/:postId/comments', controller.createComment);

router.get('/:postId/categories', controller.getAllCategories);

router.get('/:postId/like', controller.getAllLikes);
router.post('/:postId/like', controller.like);
router.delete('/:postId/like', controller.unlike);

module.exports = router;
