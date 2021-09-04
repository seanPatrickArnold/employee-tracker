const mysql = require('mysql2');
const password = require('./password');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: password,
    database: 'company'
  },
  console.log('Connected to the election database.')
);

module.exports = db




