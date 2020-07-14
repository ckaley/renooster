// import dependencies
var express = require('express');
var exphbs = require("express-handlebars");
//for users
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

// setup the express app
var app = express();
var PORT = process.env.PORT || 8080;

// require models for syncing
var db = require("./models");

// configure middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//for BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// for Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./config/passport/passport.js')(passport, db.users);

// define static directory
app.use(express.static("public"));

// setup handelbars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// routes
require("./routes/api-routes.js")(app);
require("./routes/view-routes.js")(app);
require("./routes/auth.js")(app, passport)

// start the server
db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening at http://localhost:" + PORT);
    });
});