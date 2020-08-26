var fs = require('fs');
const parse = require('csv-parse')
const csv = require('csv-parser')
const mysql = require('mysql');
const express = require('express');
var jsonexport = require('jsonexport');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//**json/csv API WORKING */
const db = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'json_parsing'

});

db.connect((err) => {

    if (err) {
        throw err;
    }
    console.log('connection established..');

});
app.listen('3000', () => {

    console.log('server started on port 3000');
});

app.post('/head', function (req, res) {

    fs.readFile('.//files/data.json', 'utf8', function (err, contents) {
        const data = JSON.parse(contents)
        var results = []
        // var dot=Object.keys(data);
        var nodeValues = Object.values(data);

        results.push(nodeValues);
        // console.log('its lan',results);

        jsonexport(results, function (err, csv) {
            if (err) return console.log(err);
            fs.writeFile(".//files/nour.csv", csv, function (err, result) {
                if (err)
                    console.log('error', err);
            })
        })

        //**********get headers and store into DB */

        const arrayset = [];

        fs.createReadStream('.//files/nour.csv')
            .pipe(csv())
            .on('headers', (headers) => {
                arrayset.push(headers)
                let i = 0;
                let text = headers;
                for (i; i < text.length; i++) {
                    db.query('ALTER TABLE json_conversion ADD ' + text[i] + ' varchar(255)', (error, response) => {
                        console.log(error || response);
                    });
                }
            })

    })

})


//**********get columns and store into DB */


app.post('/column', (req, res) => {
    //  let stream = fs.createReadStream('.\\files\\FL_insurance_sample.csv');

    let jsondata = [];
    fs.createReadStream('.\\files\\nour.csv')
        .pipe(
            parse({ delimiter: ',' }))
        .on("data", function (dataRow) {
            jsondata.push(dataRow);
        })
        .on("end", function () {
            jsondata.shift();

            let sql = 'ALTER TABLE json_conversion DROP id';
            connection.query(sql, (error, response) => {
                console.log(error || response);
            });

            let query = 'INSERT INTO json_conversion VALUES ?';
            connection.query(query, [jsondata], (error, response) => {
                console.log(error || response);
            });







        });
});


