//Edited complete dockerized and ready to function
//Start with "docker-compose up"
//For editing and test purposes "docker-compose down" and then "docker-compose build"
//Restart with docker-compose up
const express = require('express');     //Import express-module
const app = express();                  //Import express-module
const Port =8887 ;                      //Node Server Port
const bp = require('body-parser');      //Import body-parser
const mySQL = require('mysql2');        //Import mysql2
const table = require('./table')        //Import ./table.js 
var path = require('path');             //Import path var's

const db = mySQL.createConnection({
    host     : 'mysql',                 //mysql-server ip (this case ip from docker network)
    user     : 'root',                  //user name for database access
    port     : '3306',                  //mysql-server standart port
    password : 'devved',                //user passwort
    database : 'myDb',                  //database name initialized in build 

});

// function DropTables(){
//     // const dropUsersTableSQL = "DROP TABLE users;";
//     // try{
//     //     db.query(dropUsersTableSQL);
//     //     console.log("removed UsersTable")  
//     // }catch(err){
//     //     console.log(err.message); 
//     // }
// }
function createTables(){   //user login function (to-DO's: doesn`t have to be in index.js | Json Webtokens rquired!!)
    const createUsersTableSQL = "CREATE TABLE users (username VARCHAR(30) PRIMARY KEY, Name VARCHAR(30), Vorname VARCHAR(30), Password VARCHAR(30));";
        db.query(createUsersTableSQL,(err)=>{
            if (err){
                if (err.errno == 1050){
                    console.log("table useres already existed");
                }
                else{
                    console.log(err);
                }
                
                
            }
            else{
                console.log("create user table succes")  ;
            }
        });



        //save friends in users as json ?  
        const createFriendsTableSQL = "CREATE TABLE friends (user VARCHAR(30), friend VARCHAR(30),PRIMARY KEY (user,friend)";//to do have to find out what comes in there
        db.query(createUsersTableSQL,(err)=>{
             if (err){
                if (err.errno == 1050){
                    console.log("table friends already existed");
                }
                else{
                console.log(err);
                    }
            }
            else{
                console.log("create friends table succes")  ;
            }
        });



        const createPostsTableSQL = "CREATE TABLE Posts (inhalt VARCHAR(100),zeitpunkt DATE,PRIMARY KEY (inhalt,zeitpunkt));";//to do have to find out what comes in there
        db.query(createPostsTableSQL,(err)=>{
            if (err){
                if (err.errno == 1050){
                    console.log("table posts already existed");
                }
                else{
                    console.log(err);
                }
            }
            else{
                console.log("create posts table succes")  ;
            }
        });





        
}

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

db.connect((err)=>{         //connection function with exception handling, to-do provide more information if possible
    if(err){
        console.log(err);
    }
    else{
    console.log("Connection to database success");
    createTables();
    }
});

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname + '/RegistrierenEinloggen/index.html'));
});
app.listen(Port,()=>{
    console.log("listening on Port:" +  Port);
});