var express = require ("express"),
    port = process.env.PORT || 5000,

    nodemailer = require("nodemailer"),
    xoauth2    = require('xoauth2'),

    methodOverride = require("method-override"),
    cookieParser        = require("cookie-parser"),
    flash      = require("connect-flash"),
    bodyParser = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Allah scales me through!",
    resave: false,
    saveUninitialized: false
  }));

app.use(cookieParser());
app.use(flash());

app.use(methodOverride("_method"));



app.get("/", function(req, res) {
    res.render("index")
});


app.get("/contact", function(req, res) {
    res.render("index")
});


app.post('/contact/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;



    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
              type: 'OAuth2',
              user: 'afrocodez@gmail.com',
              clientId: '95046685331-jv7jrfoqo9vgfknqr54omae8qvi66b2p.apps.googleusercontent.com',
              clientSecret: 'NDDuk-uEfjs64m67XsbGM2QP',
              refreshToken: '1//04qWvM4asMAt0CgYIARAAGAQSNwF-L9IrIhqKxBdGwJBG0lziLlKJxF-HAsajJmDDJfj4c65Ljf7Ye20G-Y58cZBCA_lMFj1x0Pk'
      }
  })
  


 // setup email data with unicode symbols
  var mailOptions = {
      from: 'My Name <afrocodez@gmail.com>',
      to: 'almustaphaauthor@gmail.com',
      subject: 'Nodemailer Email',
      text: 'Hello World!!',
      html: output // html body
  }

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.redirect("/");

});
  
  
});




app.listen(port, function(){
    console.log("The Portfolio server just started")
});

