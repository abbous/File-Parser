const http = require('http');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
var fs = require('fs');
var csv = require('fast-csv');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "convertion"

});
app.listen('3000', () => {

	console.log('server started on port 3000');
});
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");

	var express = require('express');



});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/file', function (req, res) {

	fs.readFile('.\\csv\\FL_insurance_sample.csv', function (err, data) {





	});
	//res.end();

});


app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.send('logged in sucessfully');
				//	response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


