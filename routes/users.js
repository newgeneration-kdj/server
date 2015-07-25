var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */



router.post('/users', function (req, res, next) {
    var email = req.params.email;
    var username = req.params.username;
    var name = req.params.name;
    var password = req.params.password;

    var func = db.addUser(email,username,name,password);

    func.on('')


});

module.exports = router;
