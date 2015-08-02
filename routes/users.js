var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */



router.get('/:email/:username/:name/:password', function (req, res, next) {

    console.log(req.params);
    var email = req.params.email;
    var username = req.params.username;
    var name = req.params.name;
    var password = req.params.password;
    var vo = {};

    var func = db.addUser(email,username,name,password);

    func.on('success',function(results){
        console.log(results);
        res.send(200,results);
    });
    func.on('error',function(error){
        vo.error = error;
        res.send(500,vo);
        console.log('error : '+error);

    });


});

module.exports = router;
