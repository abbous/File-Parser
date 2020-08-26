var express = require('express');

var path = require('path');

var http = require('http');
var formidable = require('formidable');
const parse = require('csv-parse')

const app =express();
   
    const mysql = require('mysql');

    var xlsx = require('node-xlsx').default;

/* const xlsx= require('xlsx');
const workbook = xlsx.readFile('.//files//Financial_Sample.xlsx');
const sheet_name_list = workbook.SheetNames;
console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list]));
 */

var fs = require('fs');


/* 
const db =mysql.createConnection({

    host: 'localhost',
    user :'root',
    password:'',
    database:'test'
    
    });
    
    // establishing the connection
    
    db.connect((err)=>{
    
    if(err){
        throw err;
    }
    console.log('connection established..');
    
    }); */
    
/* var data = fs.readFileSync('.//files//Financial_Sample.xlsx', {
  encoding: 'ascii'
});
var json = JSON.parse(data);

for (var list in json) {
  var devices = json[list];
  for (var i = 0; i < devices.length; i++) {
    var device = devices[i];
    if (device["uid"])
     // console.log("UPDATE panel.device SET hardware_id = '" + device["devid"] + "' WHERE uid = '" + device["uid"] + "' AND project = 4;");
 
     console.log("INSERT INTO excel(Segment, Country, Product) \
     VALUES('?', '?', '?')")
    }
}
 */

/* 

app.post('/ping', function (req, res) {
     res.send(res.body);
    var jsondata = JSON.stringify('.//files//data.json'); */
   // var test = JSON.parse(jsondata);
   

//let jsondata = JSON.stringify(json);
//console.log(typeof jsondata);  // string
/* 
let datajson = JSON.parse(jsondata);
console.log(typeof datajson);  // object
console.log(datajson.GradeA);  // 25
   
  
  
    db.query("INSERT INTO json(GradeA, GradeB, GradeC) VALUES('?','?','?')", [datajson], function(err, result){
      if (err) throw err;
      //if no error, resulst return as follow
      console.log(result);
      console.log("Number of rows affected :" + result.affectedRows);
      console.log("Number of records affected with warning : " + result.warningCount);
      console.log("Message from MySQL Server : " + result.message);
    });
  });

 */
/* 
    let counter= 0;
  var contents = fs.readFile(".//files//data.json", function(err,data){

    if (err) throw err;
    console.log(Object.keys(JSON.parse(data)));

  });

app.listen('3000',()=>{

    console.log('server started on port 3000');
});  */

// html file containing upload form
var upload_html = fs.readFileSync("upload.html");
 
// replace this with the location to save uploaded files
var upload_path = "C:/Users/Nour.A/Documents/";
 
http.createServer(function (req, res) {
  if (req.url == '/uploadform') {
    res.writeHead(200);
    res.write(upload_html);
    return res.end();
  } else if (req.url == '/fileupload') {
   
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.filetoupload.path;
            var newpath = upload_path + files.filetoupload.name;
            // copy the file to a new location
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                // you may respond with another html page
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    }
}).listen(3000);

/* app.get('/download', function(req, res){
    var file = './/files/data.json';
    res.download(file);
  }); */