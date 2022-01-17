const { Router } = require('express');
const controller = require('../controllers/users');
const router = new Router();

router.get('/', controller.getAll);
router.get('/:userId', controller.getUniqueUser);
router.post('/', controller.create);
router.patch('/:userId', controller.update);
router.patch('/avatar', controller.updateAvatar);
router.delete('/:userId', controller.delete);

module.exports = router;
