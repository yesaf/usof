require('dotenv').config();
const mysql = require('mysql2/promise');

let connection = mysql.createPool({
  host: 'localhost' /*process.env.DB_HOST*/,
  user: 'admin' /*process.env.DB_USERNAME*/,
  password: 'qwerty123' /*process.env.DB_PASSWORD*/,
  database: 'usof' /*process.env.DB_NAME*/,
  multipleStatements: true,
});

module.exports = connection;
