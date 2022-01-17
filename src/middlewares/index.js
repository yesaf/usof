const {json, urlencoded} = require('body-parser');

const disablePoweredBy = require('./disablePoweredBy');

module.exports = (app) => {
  app.use(json());
  app.use(urlencoded({extended: true}));

  app.use(disablePoweredBy);
}
