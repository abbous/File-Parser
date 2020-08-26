const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
var formidable = require("formidable");
const parse = require("csv-parse");
const parsecsvrows = require("csv-parse");
const csvheads = require("csv-parser");
var xmlTocsv = require("csv-parse");
var xmlParse = require("csv-parse");
var jsonexport = require("jsonexport");
const routes = require("routes");
const fs = require("fs");
const mysql = require("mysql");
const csvParser = require("csv-parser");
var jsonexport = require("jsonexport");
var Parser = require("fast-xml-parser");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { async } = require("q");
var xmlcall = require("./testjunk.js");
var xmlform = require("./testjunk.js");
const jsonparse = require("csv-parse");
const JsonTocsv = require("csv-parser");
const JsonToForm = require("csv-parser");
const mysqldump = require("mysqldump");
const csvTomysql = require("mysqldump");
const nodeMailer = require("nodemailer");
const Cookies = require("cookies");
var session = require("express-session");
var NodeSession = require("node-session");

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.options("*", cors());
app.use("/views", express.static("views"));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//var upload_html = fs.readFileSync("upload.html");
let visitcounter = 0;
let closedcounter = 0;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Management",
});
app.get("/login-Form", function (req, res) {
  const remember = req.body.rem;

  var hour = 3600000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  // user mail check
  var keys = ["keyboard"];
  // Create a cookies object
  var cookies = new Cookies(req, res, { keys: keys });
  // Get a cookie
  var lastVisit = cookies.get("LastVisit", { signed: true });
  // Set the cookie to a value
  cookies.set("LastVisit", new Date(Date.now()), { signed: true });
  if (!lastVisit || remember) {
    res.sendFile(path.join(__dirname + "/views/loginuser.html"));
  } else {
    res.redirect("/Upload_Form");
  }
});

app.post("/send-email", function (req, res) {
  let insert = "INSERT INTO visitors(mail) VALUES ('" + req.body.to + "')";
  db.query(insert, function (err, result) {
    if (err) throw err;
  });
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "@gmail.com",
      pass: "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Admin" <@gmail.com>', // sender address
    to: req.body.to, // list of receivers
    subject: "File Conversion", // Subject line
    //text: req.body.body, // plain text body
    html: "<b>NodeJS Email convert your files to sql format </b>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("success");
      // res.redirect('/success');
    }
  });

  setTimeout(function () {
    // after 2 seconds
    res.redirect("/Upload_Form");
  }, 2000);
});

app.get("/Admin-panel", function (request, response) {
  //	response.sendFile(path.join(__dirname + '/login.html'));
  response.render("page-login");
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query(
      "SELECT * FROM Admin WHERE mail = ? AND pass = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/dashboard");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password! ");
    response.end();
  }
});

app.get("/dashboard", function (request, response) {
  const sql = "select sum(visits) as visit from kpi";
  const usersquery = "select count(mail) as countusers from visitors";

  db.query(sql, function (err, result) {
    db.query(usersquery, function (err, output) {
      if (err) throw err;
      if (request.session.loggedin) {
        response.render("dashboard", { visitors: result, users: output });
      } else {
        response.send("Please login to view this page!");
      }
      response.end();
    });
  });
});
app.get("/mailbox", function (request, response) {
  if (request.session.loggedin) {
    response.render("page-mailbox");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});
app.get("/userpage", function (request, response) {
  response.render("page-user");
});
app.get("/logout", function (request, response) {
  if (request.session) {
    // delete session object
    request.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return response.redirect("/Admin-panel");
      }
    });
  }
});
app.get("/Upload_Form", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/upload.html"));
  //page hits counter
  visitcounter = 1;
  var sql = "INSERT INTO kpi(visits) VALUES (" + visitcounter + ")";
  db.query(sql, [visitcounter], function (err, result) {
    if (err) throw err;
  });

  req.connection.addListener("close", function () {
    closedcounter = 1;
  });
  /*  TO DO
    let query = 'INSERT INTO xml_table VALUES ?';
    db.query(query, [rows], (error, response) => {
        console.log(error || response);
    });  */
});

app.post("/", function (req, res, next) {
  let counter = 0;
  const myData = [];
  var filepath = [];
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    //var fileType = files.ext.type.split('/').pop();
    //getting file path through html form
    var oldpath = files.ext.path;
    //extracting file extension
    var filepath = files.ext.name;
    var ext = path.extname(filepath);

    //proccessing each file according to its extension
    //if file type is .CSV
    if (ext == ".csv") {
      const db = mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: "root",
        password: "",
        database: "csvparser",
      });
      db.connect((err) => {
        if (err) {
          throw err;
        }
        console.log("connection established..");
      });

      fs.ReadStream(oldpath, "utf8", { pretty: true })
        .pipe(
          parse({
            delimiter: ",",
          })
        )
        .on("data", function (dataRow) {
          if (counter < 50) {
            myData.push(dataRow);

            ++counter;
          }
        })
        .on("end", function () {
          res.render("test", { data: myData });
        });

      fs.ReadStream(oldpath, "utf8", { pretty: true })
        .pipe(
          csvheads({
            delimiter: ",",
          })
        )
        .on("headers", (headers) => {
          let dataarray = [];
          dataarray.push(headers);
          let i = 0;
          let dbhead = headers;

          for (i; i < dbhead.length; i++) {
            db.query(
              "ALTER TABLE csv_table ADD " + dbhead[i] + " varchar(150)",
              function (err, result) {
                if (err) {
                  console.log(err);
                }
                console.log(result);
              }
            );
          }
        });
      let csvrows = [];
      fs.ReadStream(oldpath)
        .pipe(
          parsecsvrows({
            delimiter: ",",
          })
        )
        .on("data", function (dataRow) {
          csvrows.push(dataRow);
        })
        .on("end", function () {
          csvrows.shift();
          let sql = "ALTER TABLE csv_table DROP id";
          db.query(sql, (error, response) => {
            console.log(error || response);
          });
          let query = "INSERT INTO csv_table VALUES ?";
          db.query(query, [csvrows], (error, response) => {
            console.log(error || response);
          });
        });

      // IF FILE TYPE IS XML
    }
    if (ext == ".xml") {
      const db = mysql.createConnection({
        connectionLimit: 100,
        host: "localhost",
        user: "root",
        password: "",
        database: "xmlparse",
      });

      db.connect((err) => {
        if (err) {
          throw err;
        }
        console.log("connection established..");
      });

      const incomingdata = [];
      fs.readFile(oldpath, "utf8", function (err, contents) {
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
          arrayMode: true,
          stopNodes: ".",
        };
        // Intermediate obj
        var tObj = Parser.getTraversalObj(contents, options);
        var jsonObj = Parser.convertToJson(tObj, options);
        var results = [];
        var Nodevalues = Object.values(jsonObj);
        results.push(Nodevalues);
        jsonexport(results, function (err, csv, next) {
          if (err) return console.log(err);

          const migratedata = fs.writeFile(
            ".//files/file.csv",
            csv,
            async function (err, result) {
              if (err) console.log("error", err);

              let stream = await fs
                .createReadStream(".//files/file.csv")
                .pipe(
                  xmlParse({
                    delimiter: ",",
                  })
                )
                .on("data", function (dataRow) {
                  if (counter < 50) {
                    incomingdata.push(dataRow);

                    ++counter;
                  }
                })
                .on("end", function () {
                  res.render("xmlForm", { data: incomingdata });
                });
            }
          );

          const asyncheaders = () => {
            fs.ReadStream(".//files/file.csv")

              .pipe(
                csvParser({
                  mapHeaders: ({ header }) => header.replace(".", "_"),
                })
              )
              .on("headers", (headers) => {
                let i = 0;
                let text = headers;
                for (i; i < text.length; i++) {
                  db.query(
                    "ALTER TABLE xml_table ADD " + text[i] + " varchar(255)",
                    (error, response) => {
                      console.log(error || response);
                    }
                  );
                }
              });
          };
          asyncheaders();

          //**************data columns insertion********** */
          const callbackcolumns = () => {
            let rows = [];
            fs.createReadStream(".//files/file.csv")

              .pipe(xmlTocsv({ delimiter: "," }))
              .on("data", function (dataRow) {
                rows.push(dataRow);
              })
              .on("end", function () {
                rows.shift();

                let sql = "ALTER TABLE xml_table DROP id";
                db.query(sql, (error, response) => {
                  console.log(error || response);
                });

                let query = "INSERT INTO xml_table VALUES ?";
                db.query(query, [rows], (error, response) => {
                  console.log(error || response);
                });
              });
          };
          callbackcolumns();
        });
      });
      // if file type is JSON
    }
    if (ext == ".json") {
      const db = mysql.createConnection({
        connectionLimit: 100,
        host: "localhost",
        user: "root",
        password: "",
        database: "json_parsing",
      });

      db.connect((err) => {
        if (err) {
          throw err;
        }
        console.log("connection established..");
      });

      let jsonArr = [];
      fs.readFile(oldpath, "utf8", function (err, contents) {
        const filedata = JSON.parse(contents);
        var results = [];
        var nodeValues = Object.values(filedata);
        results.push(nodeValues);
        jsonexport(results, function (err, csvout) {
          if (err) return console.log(err);
          fs.writeFile(".//files/nour.csv", csvout, function (err, result) {
            if (err) console.log("error", err);

            fs.createReadStream(".//files/nour.csv")
              .pipe(JsonToForm({ delimiter: "," }))
              .on("data", function (jsonRow) {
                jsonArr.push(jsonRow);
              })
              .on("end", function () {
                res.render("jsonForm", { load: contents, csvlook: jsonArr });
              });
          });
        });
        //**********get headers and store into DB */
        const JsonHeaders = () => {
          const arrayset = [];
          fs.createReadStream(".//files/nour.csv")
            .pipe(JsonTocsv())
            .on("headers", (headers) => {
              arrayset.push(headers);
              let i = 0;
              let insertHeaders = headers;
              for (i; i < insertHeaders.length; i++) {
                db.query(
                  "ALTER TABLE json_table ADD " +
                    insertHeaders[i] +
                    " varchar(255)",
                  (error, response) => {
                    console.log(error || response);
                  }
                );
              }
            });
        };
        JsonHeaders();

        //**********get columns and store into DB */

        const jsonColumns = () => {
          let jsondata = [];
          fs.createReadStream(".\\files\\nour.csv")
            .pipe(jsonparse({ delimiter: "," }))
            .on("data", function (dataRow) {
              jsondata.push(dataRow);
            })
            .on("end", function () {
              jsondata.shift();

              let sql = "ALTER TABLE json_table DROP id";
              db.query(sql, (error, response) => {
                console.log(error || response);
              });

              let query = "INSERT INTO json_table VALUES ?";
              db.query(query, [jsondata], (error, response) => {
                console.log(error || response);
              });
            });
        };
        jsonColumns();
      });
    }
  });
});

app.post("/csv_export", async (req, res) => {
  const dumpToFile = "./public/csv_export.sql";
  await csvTomysql({
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "csvparser",
    },
    dumpToFile,
  });
  res.download(dumpToFile, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csvparser",
  });
  let DropTable = "DROP TABLE IF EXISTS csv_table";

  connect.query(DropTable, (error, response) => {
    console.log(error || response);
  });

  let buildTable = "create table csv_table(id INT(100))";
  connect.query(buildTable, (error, response) => {
    console.log(error || response);
  });
});

app.post("/json_export", async (req, res, next) => {
  const dumpToFile = "./public/import.sql";
  await mysqldump({
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "json_parsing",
    },
    dumpToFile,
  });

  res.download(dumpToFile, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "json_parsing",
  });
  let DropTable = "DROP TABLE IF EXISTS json_table";

  con.query(DropTable, (error, response) => {
    console.log(error || response);
  });

  let buildTable = "create table json_table(id INT(100))";
  con.query(buildTable, (error, response) => {
    console.log(error || response);
  });
});

app.get("/about", function (req, res) {
  res.render("about", { title: "about" });
});

app.post("/xml_export", async (req, res) => {
  const dumpToFile = "./public/xml_export.sql";
  await mysqldump({
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "xmlparse",
    },
    dumpToFile,
  });

  res.download(dumpToFile, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let dtb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "xmlparse",
  });
  let DropTable = "DROP TABLE IF EXISTS xml_table";

  dtb.query(DropTable, (error, response) => {
    console.log(error || response);
  });

  let buildTable = "create table xml_table(id INT(100))";
  dtb.query(buildTable, (error, response) => {
    console.log(error || response);
  });
});

app.all("*", (req, res) => {
  res.status(404).send();
});

app.listen(3000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT 3000");
});
