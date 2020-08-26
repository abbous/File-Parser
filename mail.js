var express = require('express'),
    path = require('path'),
   nodeMailer = require('nodemailer'),
   bodyParser = require('body-parser');
   const mysql = require('mysql');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
     // res.render('index');
     res.sendFile(path.join(__dirname + '/views/loginuser.html'));

    });

    
    app.post('/send-email', function (req, res) {
      const db =mysql.createConnection({
        host: 'localhost',
        user :'root',
        password:'',
        database:'Management'
        });
        db.connect(function(err) {
          if (err) throw err;
      // var sqlq = 'INSERT INTO visitors(mail) VALUES ('+req.body.to+')';
        let insert = "INSERT INTO visitors(mail) VALUES ('" +req.body.to+"')";
  
          db.query(insert,function (err, result) {
            if (err) throw err;
          });
        });
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'egrsyriano@gmail.com',
              pass: '$Kontult1901'
          },
          tls:{
              rejectUnauthorized:false
          }
      });
            let mailOptions = {
          from: '"Admin" <egrsyriano@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: 'File Conversion', // Subject line
          //text: req.body.body, // plain text body
          html: '<b>NodeJS Email </b>' // html body
      };

    

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }  else {
            console.log('success');
           // res.redirect('/success');
          }
         
          });
          setTimeout(function () {
            // after 2 seconds
            res.redirect('/Upload_Form');
         }, 2000)
      });
      app.get('/Upload_Form',function(req,res){
        res.sendFile(__dirname +'//views//upload.html');
    }); 
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });