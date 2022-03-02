const mysql = require('mysql2/promise');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = require('../config/index');

let connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
});

module.exports = connection;
