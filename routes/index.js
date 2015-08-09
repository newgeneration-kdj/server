var express = require('express');
var router = express.Router();
var db = require('../db');

var util = require('../util');

router.get('/',function(req,res){
    res.send("aaa");
});



router.get('/login/:username/:password', function (req, res) {
    //login
    var func = db.excuteQuery(db.query_set.user_login , [req.params.username , req.params.password]);
    var func = db.excuteQuery(db.query_set.user_login, [req.params.username, req.params.password]);
});

router.post('/login/', function (req, res) {
    //login
    var func = db.excuteQuery(db.querySet.user_login , [req.body.username , req.body.password]);
    var vo = {};

    func.on( 'success' , function(result) {
        if ( result == '' ) {
            vo.success = 0;
            res.status(200).send(vo);
        } else {
            vo.success = 1;
            res.status(200).send(vo);
        }
    });
    func.on ('error' , function(error) {
        vo.error = error;
        res.send(500,vo);
        console.log('error : ' + error );
    });
});


router.post('/logout', function (req, res) {

});


router.get('/duplicate/usernames/:username', function (req, res) {

    var func = db.isDuplicateUsername(req.params.username);
    var func = db.excuteQuery(db.querySet.is_duplicate_username , [req.params.username]);
    var vo = {};

    func.on('success', function (results) {
        //console.log('results : ' + results);

        if (results == '') {
            vo.exist = 0;
            res.status(200).send(vo);
        } else {
            vo.exist = 1;
            res.status(200).send(vo);
        }
    });
    func.on('error', function (error) {
        vo.error = error
        res.send(500, vo);
        console.log('error : ' + error);
    });

});
router.get('/duplicate/emails/:email', function (req, res) {

    var func = db.isDuplicateEmail(req.params.email);
    var func = db.excuteQuery(db.querySet.is_duplicate_email , [req.params.email]);
    var vo = {};

    func.on('success', function (results) {
        //console.log('results : ' + results);


        if (results == '') {
            vo.exist = 0;
            res.status(200).send(vo);
        } else {
            vo.exist = 1;
            res.status(200).send(vo);
        }
    });
    func.on('error', function (error) {
        vo.error = error
        vo.error = error;
        res.send(500, vo);
        console.log('error : ' + error);
    });

});

router.post('/users/' , function(req, res){

    var current = util.getDatetime(Date.now());
    var func = db.excuteQuery(db.querySet.is_duplicate_email , [req.body.email , req.body.username , req.body.name ,  req.body.password , current ] );
    var vo = {};

    func.on('success' , function(results) {

        if ( results = '' ){
            vo.success = 0;
            res.status(200).send(vo);
        } else {
            vo.success = 1;
            vo.email = req.body.email;
            res.status(200).send(vo);
        }
    });
    func.on('error' , function(error) {
        vo.error = error;
        res.send(500,vo);

    });
});

module.exports = router;

//아이디중복
