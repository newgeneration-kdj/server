/**
 * Created by pc on 2015-07-19.
 */

var mysql = require('mysql');

var conn = mysql.createConnection({
    host :'ja-cdbr-azure-west-a.cloudapp.net',
    port : 3306,
    user : 'bcf50bd9f0e6cc',
    password : 'c71cc2cf',
    database:'dandisnap'

});

var EventEmitter = require('events').EventEmitter;

module.exports =  {

    isDuplicateEmail :  function(email){
        var evt = new EventEmitter();
        conn.query('select * from user where email = ?' ,[email],function(error,results){

                if(error){
                    evt.emit('error',error);
                }else{
                    evt.emit('success',results);
                }

        });

        return evt;

    },
    isDuplicateUsername: function(username){
        var evt = new EventEmitter();
        conn.query('select * from user where username = ?' ,[username],function(error,results){

            if(error){
                evt.emit('error',error);
            }else{
                evt.emit('success',results);
            }
        });

        return evt;

    },

    addUser  : function(email,username,name,password){
        var evt = new EventEmitter();
        conn.query('insert into user(email,username,name,password) values(?,?,?,?)',[email,username,name,password],function(error,result){
           if(error){
               evt.emit('error',error);

           }else{
               evt.emit('success',result);
           }

        });
        return evt;

    }




};