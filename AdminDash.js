var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors');

var connection = mysql.createConnection({
	multipleStatements:true,
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'Management'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set("views",path.join(__dirname,"views")) 
app.use('/views', express.static('views'))

app.set("view engine","pug") 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());

app.get('/Admin-panel', function(request, response) {
//	response.sendFile(path.join(__dirname + '/login.html'));
response.render('page-login');
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM Admin WHERE mail = ? AND pass = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password! ');
		response.end();
	}
});

app.get('/dashboard', function(request, response) {
	
	const sql = 'select sum(visits) as visit from kpi';
	const usersquery = 'select count(mail) as countusers from visitors';

	connection.query(sql,function (err, result) {
	connection.query(usersquery,function (err, output) {
	  if (err) throw err;
	if (request.session.loggedin) {
		response.render('dashboard',{visitors:result, users:output})
	} else {
		response.send('Please login to view this page!');
	} 
	response.end();
});
});
});

app.get('/mailbox', function(request, response) {
	if (request.session.loggedin) {
		response.render('page-mailbox')
		} else {
		response.send('Please login to view this page!');
	} 
	response.end();
});
app.get('/userpage', function(request, response) {
	
	response.render('page-user')
});
app.get('/logout', function(request, response) {
	if (request.session) {
		// delete session object
		request.session.destroy(function(err) {
		  if(err) {
			return next(err);
		  } else {
			return response.redirect('/Admin-panel');
		  }
		});
	  }
	//response.render('page-login')


});

app.listen(3000);