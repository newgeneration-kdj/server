/**
 * Created by pc on 2015-07-19.
 */

var mysql = require('mysql');
var util = require('../util');

/*
var conn = mysql.createConnection({
    host: 'ja-cdbr-azure-west-a.cloudapp.net',
    port: 3306,
    user: 'bcf50bd9f0e6cc',
    password: 'c71cc2cf',
    database: 'dandisnap'

});
*/
var pool = mysql.createPool({

    host: 'ja-cdbr-azure-west-a.cloudapp.net',
    port: 3306,
    user: 'bcf50bd9f0e6cc',
    password: 'c71cc2cf',
    database: 'dandisnap',
    connectionLimit:20,
    waitForConnections:false
})



var EventEmitter = require('events').EventEmitter;

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

    }


};