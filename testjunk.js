
const fs = require('fs');
const express=require('express');
var mysql = require('mysql');
var jsonexport = require('jsonexport');
var Parser = require("fast-xml-parser");
var formidable = require('formidable');
const cors = require('cors');
const path = require("path") 
var bodyParser = require('body-parser');
var xmlTocsv = require('csv-parse');
var xmlParse = require('csv-parse');
const csvParser = require('csv-parser')

var app = express();
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","pug") 
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());

const db =mysql.createConnection({
  connectionLimit : 100,
  host: 'localhost',
  user :'root',
  password:'',
  database:'xmlparse'
  });
      
  db.connect((err)=>{
  
  if(err){throw err;}
  console.log('connection established..'); }); 

  
//***********parsing xml data---headers exraction and insertion**** */
 var uiForm = fs.readFileSync(".//views//upload.html");
 app.get("/",function (req,res){ 
    res.writeHead(200);
    res.write(uiForm);
      res.end();
          }) 
      
  app.post("/",function  (req, res)  {
  
    const csvNewpath= ".//files/file.csv"; 
    let counter=0;
    const myData = [];

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
   //   var fileType = files.ext.type.split('/').pop();
   var oldpath = files.ext.path;



fs.readFile(oldpath, 'utf8', function(err, contents) {
  var options = {
    attributeNamePrefix : "",
    attrNodeName:'',
    textNodeName :false,
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: false,
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true, //"strict"
    stopNodes: '.'
    };
 // Intermediate obj
 var tObj = Parser.getTraversalObj(contents,options);
 var jsonObj = Parser.convertToJson(tObj,options);
   var results=[]   
   var Nodevalues = Object.values(jsonObj);
    results.push(Nodevalues);
    jsonexport(results,  function(err, csv,next){
      if(err) return console.log(err);  
     
  const migratedata=  fs.writeFile(".//files/file.csv", csv ,async  function(err, result) {
      if(err) 
      console.log('error', err);
  

let  stream =  await fs.createReadStream(".//files/file.csv")
           .pipe(
                xmlParse({
                      delimiter:','
                  })
              )
              .on("data", function (dataRow) {
              
                  myData.push(dataRow);
                  
              
              }).on("end", function () {
                        
                res.render('xmlForm', { data: myData })
            }); 
          })


const asyncheaders= async()=>{

await fs.ReadStream(".//files/file.csv")

.pipe(csvParser({ mapHeaders: ({ header  }) => header.replace('.','_')}))
.on('headers',  (headers) => {
      let i = 0;
      let text =  headers;
        for (i ; i<text.length ;i++){
              db.query('ALTER TABLE xml_table ADD '+text[i]+' varchar(255)',(error, response) => {
              console.log(error || response);
});
}
})     
}
asyncheaders().then(console.log)
//**************data columns insertion********** */
const callbackcolumns= ()=>{

    let rows = [];
   fs.createReadStream(".//files/file.csv")
 
        .pipe(xmlTocsv({ delimiter:',' }))
        .on("data", function (dataRow) {
          rows.push(dataRow);
        })
        .on("end", function () {
          rows.shift();
         
                 let sql = 'ALTER TABLE xml_table DROP id';
                db.query(sql,(error, response) => {
                    console.log(error || response);
                });
               
                let query = 'INSERT INTO xml_table VALUES ?';
                db.query(query, [rows], (error, response) => {
                    console.log(error || response);
                });  
        }); 
      }
      callbackcolumns()
         
      
    })
    }) 
  }) 
})


//exports.xmlParsing =xmlParsing;
//app.listen('3000',()=>{console.log('server started on port 3000');}); 
