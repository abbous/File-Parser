var fs = require('fs');
const jsonparse = require('csv-parse')
const JsonTocsv = require('csv-parser')
const JsonToForm = require('csv-parser')

const mysql = require('mysql');
const express = require('express');
var jsonexport = require('jsonexport');
const path=require('path');
var formidable = require('formidable');
var bodyParser = require('body-parser');
const cors = require('cors');
const app =express();
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","pug") 
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());
//**json/csv API WORKING */
/* const db =mysql.createConnection({
    connectionLimit : 100,
    host: 'localhost',
    user :'root',
    password:'',
    database:'json_parsing'
    
    }); 
    db.connect((err)=>{
    if(err){throw err; }
    console.log('connection established..'); });
    app.listen('3000',()=>{console.log('server started on port 3000');}); 
    
    var uiForm = fs.readFileSync(".//views//upload.html");
    app.get("/",function (req,res){ 
       res.writeHead(200);
       res.write(uiForm);
         res.end();
             }) 
 app.post("/",function  (req, res)  {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
   var oldpath = files.ext.path;

   let jsonArr=[];
fs.readFile(oldpath, 'utf8', function(err, contents) {
  const filedata = JSON.parse(contents)
  var results=[]
 var nodeValues=Object.values(filedata);
  results.push(nodeValues);
  jsonexport(results,function(err, csvout){
      if(err) return console.log(err);    
  fs.writeFile(".//files/nour.csv", csvout , function(err, result) {
      if(err) 
      console.log('error', err);
      
    fs.createReadStream(".//files/nour.csv")
    .pipe( JsonToForm({delimiter:','}))
    .on("data", function (jsonRow) {
    jsonArr.push(jsonRow);
    
   }).on("end", function () {
     res.render('jsonForm', { load: contents, csvlook:jsonArr })
 }); 
  })
}) */
//**********get headers and store into DB */
 /* const JsonHeaders= ()=>{

  const arrayset = [];
   fs.createReadStream('.//files/nour.csv')
     .pipe(JsonTocsv())
     .on('headers', (headers) => {
        arrayset.push(headers)
       let i = 0;
       let text = headers;
   for (i ; i<text.length ;i++){
           db.query('ALTER TABLE json_table ADD '+text[i]+' varchar(255)',(error, response) => {
            console.log(error || response);
        });
       }
     })   
    
  }
  JsonHeaders() 
 */

//**********get columns and store into DB */
/* 
const jsonColumns= ()=>{
    let jsondata = [];
    fs.createReadStream('.\\files\\nour.csv')
        .pipe(
          jsonparse({delimiter:','}))
        .on("data", function (dataRow) {
            jsondata.push(dataRow);
        })
        .on("end", function () {
            jsondata.shift();
           
                let sql = 'ALTER TABLE json_table DROP id';
                db.query(sql,(error, response) => {
                    console.log(error || response);
                });
               
                let query = 'INSERT INTO json_table VALUES ?';
                db.query(query, [jsondata], (error, response) => {
                    console.log(error || response);
                }); 
                
            });
           }
          jsonColumns() 

          })
        })
        }) */
let counter = 0

  app.get("/hat",function  (req, res)  {

    console.log(++counter)
  }
  )
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
 