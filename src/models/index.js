const connection = require('../database/db');

class Model {
  constructor() {
    this.DB = connection;
  }
}

module.exports = Model;
