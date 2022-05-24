const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhosst',
    user: 'root',
    database: 'node-complete',
    password: 'Alo113114115@@'
});

module.exports = pool.promise();