const { Router } = require('express');
const passport = require('passport')
const controller = require('../controllers/auth');
const router = new Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), controller.logout);
router.post('/password-reset', controller.passwordReset);
router.post('/password-reset/:token', controller.passwordResetToken);

module.exports = router;
