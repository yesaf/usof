const { Router } = require('express');
const controller = require('../controllers/auth');
const router = new Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/password-reset', controller.passwordReset);
router.post('/password-reset/:token', controller.passwordResetToken);

module.exports = router;
