const express = require('express');
const app = express();
const Port = 8888;
const bp = require('bodyParser');
const mySQL = require('mysql2/promise');
app.use(bp.text());



app.listen(Port,()=>{
    console.log("hello world");
    mySQL.createConnection({
        host: 
        user:
        password:
        database:
    })
    .then((con) => con.query(
        ''
    ))
});