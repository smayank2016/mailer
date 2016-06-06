var nodemailer = require("nodemailer");
var express = require("express")
var http = require("http")
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "smayank@thoughtworks.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "904748608369-uk492q9spu2n233q7j3kqshni6t1kki1.apps.googleusercontent.com",
      clientSecret: "qdYJ1JKKY_BHn6DwezRk7rqU",
      refreshToken: "1/2jYJsE3gta8gNHu0r3Cq57DlU1oRKlY8Ix0vkZabYtg"
    }
  }
});


app.post('/api/users', function(req, res) {
    var to_emailid = req.body.toemailid;
    var subject = req.body.subject;
    var message = req.body.message;

    var mailOptions = {
                        from: "smayank@thoughtworks.com",
                        to: to_emailid,
                        subject: subject,
                        generateTextFromHTML: true,
                        html: "<b>" + message + "</b>"
                      }

    smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      res.send(error);
    } else {
      
      res.send("Mail Sent Successfully");
    }
    smtpTransport.close();
    });
   // res.send(user_id + ' ' + token + ' ' + geo);
});


// routes will go here

// start the server
app.listen(8080);
console.log('Server started! At http://localhost:' + 8080);