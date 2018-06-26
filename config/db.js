module.exports = function(){
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host    : 'hojong.xyz',
        user    : 'hackathon_2018_1',
        password: 'wjswhdgh',
        database: 'hackathon_2018_1_db'
    });

    conn.connect();
    return conn;
}
