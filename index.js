require('dotenv').config({ path: '.env' });
var express = require('express');
var http = require('http');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var validator = require("email-validator");
const emailExistence = require("email-existence")

var app = express();
var server = http.Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ######################################
// ######################################


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/send', function(req, res) {
  emailExistence.check(req.body.user, function(error, response){
    console.log('res: '+response);
    if (response) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'ka4anbek@gmail.com',
            pass: process.env.PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let options = {
        form: '"ka4andev" <ka4anbek@gmail.com>',
        to: req.body.user,
        subject: 'Hello....',
        text: req.body.message
      }


      transporter.sendMail(options, (error, info) => {
        if (error) {
          return console.log('Error')
        }
        console.log('Message sent !)!)!)!)');
        console.log('sent to ' + info.accepted);
      });
      res.redirect('/')
    } else {
      res.send('email doesnt exists((((( <a href="/">try again</a>')
    }
  });

})
server.listen(process.env.PORT || 7070);