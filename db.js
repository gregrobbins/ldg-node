var util = require('util');
var mysql = require('mysql');

connect = function(cb) {
    console.log('Connecting to MySQL...');
    client = mysql.createClient({
        // user: 'ldg',
        // password: 'dev123',
        // database: 'ldg',
        // host: 'localhost',
        // port: '3306',
        user: 'luzdega1_node',
        password: 'dev1234',
        database: 'luzdega1_ldg',
        host: 'www.luzdegas.com',
        port: '3306',
    });
    cb(client);
}

exports.connect = connect;
