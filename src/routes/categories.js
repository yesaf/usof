const { Router } = require('express');
const controller = require('../controllers/categories');
const router = new Router();

router.get('/', controller.getAll);
router.post('/', controller.create);

router.get('/:categoryId', controller.getCategory);
router.patch('/:categoryId', controller.updateCategory);
router.delete('/:categoryId', controller.removeCategory);

router.get('/:categoryId/posts', controller.getCategoryPosts);

module.exports = router;
