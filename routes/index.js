var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/',function(req,res){
    res.send("aaa");
})


router.get('/login/:username/:password', function (req, res) {
    //login
    var func = db.excuteQuery(db.query_set.user_login , [req.params.username , req.params.password]);
    var vo = {};

    func.on( 'success' , function(result) {
        if ( result == '' ) {
            vo.exist = 0;
            res.status(200).send(vo);
        } else {
            vo.exist = 1;
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

module.exports = router;

//아이디중복
