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
    connectionLimit:20,
    waitForConnections:false

});

exports.querySet = {
    is_duplicate_email : 'select * from user where email = ?',
    is_duplicate_username : 'select * from user where username = ?',
    add_user : 'insert into user(email,username,name,password)' +
    ' values(?,?,?,?)',
    add_user_created : 'insert into user(email,username,name,password,crated)' +
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

/*
module.exports = {

    isDuplicateEmail: function (email) {
        var evt = new EventEmitter();
        pool.getConnection(function(err,conn){
            conn.query('select * from user where email = ?', [email], function (error, results) {

                if (error) {
                    evt.emit('error', error);
                } else {
                    evt.emit('success', results);
                }
                conn.release();
            });
        });
        return evt;

    },

    isDuplicateUsername: function (username) {
        var evt = new EventEmitter();
        pool.getConnection(function(err,conn){
            conn.query('select * from user where username = ?', [username], function (error, results) {

                if (error) {
                    evt.emit('error', error);
                } else {
                    evt.emit('success', results);
                }

                conn.release();
            });
        });
        return evt;

    },

    addUser: function (email, username, name, password) {
        var evt = new EventEmitter();
        var current = util.getDatetime(Date.now());
        pool.getConnection(function(err,conn) {
            conn.query('insert into user(email,username,name,password,pic_url,intro,isdeprecated,created,updated)' +
                ' values(?,?,?,?,?,?,?,?,?)', [email, username, name, password, '', '', 0, current, current], function (error, results) {
                if (error) {
                    evt.emit('error', error);

                } else {
                    evt.emit('success', results);
                }

                conn.release();

            });
        });
        return evt;

    },

    userLogin : function ( username , password ) {
        var evt = new EventEmitter ();

        pool.getConnection( function ( err, conn ) {
            conn.query ( 'select user from user where username = ? and password = ?'
                , [username , password] ,function ( error , results ) {
                if ( error ) {
                    evt.emit('error', error);
                } else {
                    evt.emit('success', results);
                }

                conn.release();
            });
        });
    },

    addLike : function ( userid , contentid ) {
        var evt = new EventEmitter();
        var current = util.getDatetime(Date.now());
        pool.getConnection( function ( err , conn ) {
            conn.query ( 'insert into like(for_userid,for_contentid,created,isdeprecated)'
                + ' values(?,?,?,?)' , [userid , contentid , current , 0] , function ( error , results )  {
                if ( error ) {
                    evt.emit('error' , error );
                } else {
                    evt.emit('success' , results );
                }

                conn.release();
            });

        });
    },

    addUserToUser : function ( fromUser , toUser ) {
        var evt = new EventEmitter();
        var current = util.getDatetime(Date.now());

        pool.getConnection( function ( err, conn ) {
            conn.query ( 'insert into usertouser(from_userid,to_userid,created)'
                + ' values(?,?,?)', [fromUser,toUser,current] , function(error,results ) {
                    if ( error ) {
                        evt.emit('error' , error );
                    } else {
                        evt.emit('results' , results );
                    }
                    conn.release();
            });
        });
    },

    getUserId : function ( username ) {
        var evt = new EventEmitter ();

        pool.getConnection( function ( err , conn ) {
            conn.query ('select c_userid form user where username = ?' , [username] , function(error , results ) {
                if ( error ) {
                    evt.emit( 'error' , error );
                } else {
                    evt.emit( 'success' , results );
                }
                conn.release();
            });
        });
    },

    getContentIds : function ( username ) {
        var evt = new EventEmitter();

        pool.getConnection( function ( err , conn ) {
            conn.query ( 'select * from content where for_userid = ?', [username] , function(error, results ) {
                if ( error ) {
                    evt.emit ( 'error' , error );
                } else {
                    evt.emit ( 'results' , results );
                }
                conn.release();
            });
        });
    },


};*/
