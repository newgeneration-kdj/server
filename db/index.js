/**
 * Created by pc on 2015-07-19.
 */

var mysql = require('mysql');
var util = require('../util');
var EventEmitter = require('events').EventEmitter;
var pool = mysql.createPool({

    host: 'ja-cdbr-azure-west-a.cloudapp.net',
    port: 3306,
    user: 'bcf50bd9f0e6cc',
    password: 'c71cc2cf',
    database: 'dandisnap',
    connectionLimit:2,
    waitForConnections:true

});


exports.querySet = {
    is_duplicate_email : 'select * from user where email = ?',
    is_duplicate_username : 'select * from user where username = ?',
    add_user : 'insert into user(email,username,name,password)' +
    ' values(?,?,?,?)',
    add_user_created : 'insert into user(email,username,name,password,created)' +
    'values(?,?,?,?,?)',
    user_login : 'select * from user where username = ? and password = ?'
};

exports.excuteQuery = function ( query , params ) {
    var evt = new EventEmitter ();

    pool.getConnection(function ( err, conn ){
            conn.query( query, params , function ( error , results ) {
                if ( error ) {
                    evt.emit('error' , error );
                } else {
                    evt.emit('success' , results );
                }
                conn.release();
            });
    });

    return evt;
};
