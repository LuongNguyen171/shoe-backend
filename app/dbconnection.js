require('dotenv').config();
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    connectTimeout: 10000,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
});

module.exports = con;