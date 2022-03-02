const { Router } = require('express');
const controller = require('../controllers/comments');
const passport = require('passport');
const router = new Router();

router.get('/:commentId', passport.authenticate('jwt', { session: false }), controller.getComment);
router.patch('/:commentId', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:commentId', passport.authenticate('jwt', { session: false }), controller.remove);

router.get('/:commentId/like', passport.authenticate('jwt', { session: false }), controller.getLikes);
router.post('/:commentId/like', passport.authenticate('jwt', { session: false }), controller.like);
router.delete('/:commentId/like', passport.authenticate('jwt', { session: false }), controller.unlike);

module.exports = router;
