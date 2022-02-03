const { Router } = require('express');
const controller = require('../controllers/posts');
const passport = require("passport");
const router = new Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

router.get('/:postId', passport.authenticate('jwt', { session: false }), controller.getPost);
router.patch('/:postId', passport.authenticate('jwt', { session: false }), controller.updatePost);
router.delete('/:postId', passport.authenticate('jwt', { session: false }), controller.deletePost);

router.get('/:postId/comments', passport.authenticate('jwt', { session: false }), controller.getAllComments);
router.post('/:postId/comments', passport.authenticate('jwt', { session: false }), controller.createComment);

router.get('/:postId/categories', passport.authenticate('jwt', { session: false }), controller.getAllCategories);

router.get('/:postId/like', passport.authenticate('jwt', { session: false }), controller.getAllLikes);
router.post('/:postId/like', passport.authenticate('jwt', { session: false }), controller.like);
router.delete('/:postId/like', passport.authenticate('jwt', { session: false }), controller.unlike);

module.exports = router;
