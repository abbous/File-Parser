const fs = require("fs");
const express = require("express");
var mysql = require("mysql");
var jsonexport = require("jsonexport");
var Parser = require("fast-xml-parser");
var parse = require("csv-parse");
const csv = require("csv-parser");
var app = express();

const db = mysql.createConnection({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "woo",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connection established..");
});

//***********parsing xml data---headers exraction and insertion**** */

app.post("/headers", (req, res) => {
  fs.readFile(".//files/sample.xml", "utf8", function (err, contents) {
    var options = {
      attributeNamePrefix: "",
      attrNodeName: "",
      textNodeName: false,
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: false,
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: true, //"strict"
      stopNodes: ".",
    };
    // Intermediate obj
    var tObj = Parser.getTraversalObj(contents, options);
    var jsonObj = Parser.convertToJson(tObj, options);
    var results = [];
    var key = Object.values(jsonObj);
    results.push(key);
    jsonexport(results, function (err, csv) {
      if (err) return console.log(err);
      fs.writeFile(".//files/file.csv", csv, function (err, result) {
        if (err) console.log("error", err);
      });
    });

    fs.createReadStream(".//files/file.csv")
      .pipe(csv({ mapHeaders: ({ header }) => header.replace(".", "_") }))
      .on("headers", (headers) => {
        fs.writeFile(".//files/result.csv", headers, function (err, result) {
          if (err) console.log("error", err);
        });

        let i = 0;
        let text = headers;

        for (i; i < text.length; i++) {
          db.query(
            "ALTER TABLE users ADD " + text[i] + " varchar(255)",
            (error, response) => {
              console.log(error || response);
            }
          );
        }
        console.log(results);
      });
  });
});

//**************data columns insertion********** */

app.post("/column", (req, res) => {
  let myData = [];
  fs.createReadStream(".\\files\\file.csv")
    .pipe(parse({ delimiter: "," }))
    .on("data", function (dataRow) {
      myData.push(dataRow);
    })
    .on("end", function () {
      myData.shift();
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "woo",
      });

      // open the connection
      connection.connect((err) => {
        if (err) {
          console.log(err);
        } else {
          let sql = "ALTER TABLE users DROP id";
          connection.query(sql, (error, response) => {
            console.log(error || response);
          });

          let query = "INSERT INTO users VALUES ?";
          connection.query(query, [myData], (error, response) => {
            console.log(error || response);
          });
        }
      });
    });
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});
