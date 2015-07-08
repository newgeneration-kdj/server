var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host :'ap-cdbr-azure-east-c.cloudapp.net',
    port : 3306,
    user : 'beb66692cdc551',
    password : '215db494',
    database:'newgeneration'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  conn.query('select * from Test', function (err, rows, fields) {
  if (err) throw err; 
  console.log(rows);
  res.render('index', { title: 'select * from  -> rows.length : ' + rows.length });
 });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
