const {json, urlencoded} = require('body-parser');
const passport = require('passport');
const passportJWT = require('./passport');

const disablePoweredBy = require('./disablePoweredBy');

module.exports = (app) => {
  app.use(passport.initialize());
  passportJWT(passport);
  app.use(json());
  app.use(urlencoded({extended: true}));

  app.use(disablePoweredBy);
}
