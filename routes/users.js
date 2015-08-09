var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */



router.post('/' , function(req, res){

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
