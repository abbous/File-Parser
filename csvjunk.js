const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 
const csv = require('csv-parser')
const fs = require('fs')
const mysql = require('mysql');
var formidable = require('formidable');
const parse = require('csv-parse')
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
var Regex = require("regex");

// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","pug") 
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());
//**** DB connection */
const db =mysql.createConnection({
    connectionLimit : 100,
    host: 'localhost',
    user :'root',
    password:'',
    database:'csvparser'
    });
    db.connect((err)=>{
    
    if(err){
        throw err;
    }
    console.log('connection established..');
    });
    app.listen('3000',()=>{console.log('server started on port 3000');
    }); 
//************************************ */

//var upload_html = fs.readFileSync("upload.html");
app.get("/",function(req,res){ 
   // res.writeHead(200);
    res.sendFile(path.join(__dirname + '/views/upload.html'));


   // res.write(upload_html);
    //res.end();
     
    })
    
 app.post("/",function (req, res) { 

    let dataarray = [];
    let hat=[];

var extract=[];
            const myData = [];
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
            var oldpath = files.ext.path;
            // specify file delimiter
           /*  if(deli==';')
            var opt={delimiter:';'}
            else{
               opt={delimiter:','}
            } */
          
            fs.createReadStream(oldpath,'utf8',{highWaterMark : 256 * 1024})
                    .pipe(
                        parse({delimiter:','})
                    )
                    .on("data", function (dataRow) {
                        var arr = [];
                        let i = 0;

                        myData.push(dataRow);
            
                    })  .on("end", function () {
                        
                    res.render('test', { data: myData })
                });
/* 
                fs.ReadStream(oldpath,'utf8',{pretty:true})
                .pipe(csv({
                    delimiter:',',
                }))
                .on('headers', (headers) => {
                    dataarray.push(headers)
                 
              
                  let i = 0;
                  let text = headers;
              
              for (i ; i<text.length ;i++){
                
                      db.query('ALTER TABLE csv_conversion ADD '+text[i]+' varchar(150)',function(err,result){
                          if(err)
                      {
                          console.log(err);
                      }
                      console.log(result);
                      });
                  }
                })
    

 */







            })  
    
})  
    