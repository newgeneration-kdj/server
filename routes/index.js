var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host :'ap-cdbr-azure-east-c.cloudapp.net',
    port : 3306,
    user : 'beb66692cdc551',
    password : '215db494',
    database:'newgeneration'
    /*host :'localhost',
    port : 3306,
    user : 'ladmusician',
    password : '',
    database:'test'*/
});

conn.connect();
 conn.query('SELECT * FROM USER', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  
  conn.query('SELECT * FROM USER', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
    res.render('index', { title: 'Express', content: rows });
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
