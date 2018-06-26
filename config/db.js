module.exports = function(){
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'qlrqodxodn12',
        database: 'hackathon'
    });

    conn.connect();
    return conn;
}
