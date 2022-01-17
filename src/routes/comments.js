
const { Router } = require('express');
const controller = require('../controllers/comments');
const router = new Router();

router.get('/:commentId', controller.getComment);
router.post('/', controller.create);
router.patch('/:commentId', controller.update);
router.delete('/:commentId', controller.remove);

router.get('/:commentId/like', controller.getLikes);
router.post('/:commentId/like', controller.like);
router.delete('/:commentId/like', controller.unlike);

module.exports = router;
