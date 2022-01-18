CREATE DATABASE IF NOT EXISTS usof;
USE usof;

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerty123';

GRANT ALL PRIVILEGES ON usof.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
