const { Router } = require('express');
const passport = require('passport');
const controller = require('../controllers/categories');
const router = new Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getOne);
router.patch('/:categoryId', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:categoryId', passport.authenticate('jwt', { session: false }), controller.remove);

router.get('/:categoryId/posts', passport.authenticate('jwt', { session: false }), controller.getCategoryPosts);

module.exports = router;
