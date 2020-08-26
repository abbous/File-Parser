const parse = require('csv-parse')
const csvheads = require('csv-parser')
const fs = require('fs')
const mysql = require('mysql');
const express = require('express');
var csvHeaders = require('csv-headers');

const app =express();

//**CSV API WORKING */
const db =mysql.createConnection({
    connectionLimit : 100,
    host: 'localhost',
    user :'root',
    password:'',
    database:'management'
    
    });
        
    db.connect((err)=>{
    
    if(err){
        throw err;
    }
    console.log('connection established..');
    
    });
    app.listen('3000',()=>{

        console.log('server started on port 3000');
    }); 







app.post('/column',(req,res)=>{
  //  let stream = fs.createReadStream('.\\files\\FL_insurance_sample.csv');

    let myData = [];

    fs.createReadStream('.\\files\\business-operations-survey-2019-international-engagement-csv.csv')
        .pipe(
            parse({

                delimiter:',',
                ltrim:true,
                rtrim:true,
                trim:true,
                skip_lines_with_error:true
            })
        )
   
        .on("data", function (dataRow) {
            myData.push(dataRow);

        })
        .on("end", function () {
            myData.shift();
            const connection = mysql.createConnection({
    
                host: 'localhost',
                user :'root',
                password:'',
                database:'management'    
        });

        // open the connection
        connection.connect((err) => {
            if(err)
            {
                console.log(err);
            }else{
                let sql = 'ALTER TABLE test DROP id';
                connection.query(sql,(error, response) => {
                    console.log(error || response);
                });
               
                let query = 'INSERT INTO test VALUES ?';
                connection.query(query, [myData], (error, response) => {
                    console.log(error || response);
                }); 
            

            }
           

        });
                
            });
           }); 
           app.post('/head', function(req,res){
/* 
fs.ReadStream('.\\files\\Devices.csv','utf8',{pretty:true})
.pipe(csvheads({
    delimiter: ',',
    columns: true,
    trim: true,
    skip_empty_lines: true}))
.on('headers', (headers) => {
    let dataarray = [];
    dataarray.push(headers)
    dataarray.trim()
    let i = 0;
    let dbhead = headers;

for (i ; i<dbhead.length ;i++){

        db.query('ALTER TABLE test ADD '+dbhead[i]+' varchar(150)',function(err,result){
            if(err)
        {
            console.log(err);
        }
        console.log(result);
        });
    }
}) 
     */
 
 
var options = {
    file      : '.\\files\\business-operations-survey-2019-international-engagement-csv.csv',
    delimiter : ','
};
 
csvHeaders(options, function(err, headers) {
    if(!err)
        console.log(headers);
        
    let i = 0;
    let text = headers;

for (i ; i<text.length ;i++){
  
        db.query('ALTER TABLE test ADD '+text[i]+' varchar(255) ',function(err,result){
            if(err)
        {
            console.log(err);
        }
        console.log(result);
        });
    }
});

/* 
app.post('/head', function(req,res){
    const results = [];

fs.createReadStream('.\\files\\Devices.csv')
  .pipe(parse({ltrim :true, rtrim :true,trim :true, delimiter:','}))
  .on('headers', (headers) => {
  results.push(headers)
   

    let i = 0;
    let text = headers;

for (i ; i<text.length ;i++){
  
        db.query('ALTER TABLE test ADD '+text[i]+' text',function(err,result){
            if(err)
        {
            console.log(err);
        }
        console.log(result);
        });
    }
  }) */
    
})