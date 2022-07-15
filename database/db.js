const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});
connection.connect(function (error) {
    if (error){
        throw error;
    }else{
        console.log('connection successfully');
    }
});


module.exports = connection;
