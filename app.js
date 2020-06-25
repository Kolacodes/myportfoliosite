var express = require ("express"),
    port = process.env.PORT || 5000,
    nodemailer = require("nodemailer"),
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
    let transporter = nodemailer.createTransport({
      host: 'mail.myquranjourney.net',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'editor@myquranjourney.net', // generated ethereal user
          pass: 'teedanjum'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <editor@myquranjourney.net>', // sender address
        to: 'almustaphaauthor@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
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