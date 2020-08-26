const mysql = require('mysql');
const express = require('express');
const mysqldump = require('mysqldump')
var fs = require('fs');

 
const app =express();

 const dumpToFile= './public/import.sql';
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'xmlparse',
       
    },
    dumpToFile
})
    fs.writeFileSync(dumpToFile);
 
    
    
app.listen('3000',()=>{ console.log('server started on port 3000');
 }); 
    /*   let db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'json_parsing'
              });
        
            
            
                let DropTable =  "DROP TABLE IF EXISTS json_table";
            
                  db.query(DropTable,(error, response) => {
                    console.log(error || response);
                });
                 
                let buildTable=  "create table json_table(id INT(100))";
                db.query(buildTable, (error, response) => {
                    console.log(error || response);
                });  */