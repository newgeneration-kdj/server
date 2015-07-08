var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var connection = mysql.createConnection({
    host :'ap-cdbr-azure-east-c.cloudapp.net',
    port : 3306,
    user : 'beb66692cdc551',
    password : '215db494',
    database:'newgeneration'
});
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('a');
  var query = connection.query('select * from users',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
  res.render('index', { title: 'Express' });
});

module.exports = router;
