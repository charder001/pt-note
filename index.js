//setting package requirements
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
// var slug = require("slug")
// var path = require("path")
// var find = require("array-find")
// var mongojs = require("mongojs")
var mongoose = require('mongoose')
// var multer = require("multer")
// var User = require('./models/user.js')
var expressValidator = require('express-validator')

// var bcryptjs = require("bcryptjs")

// Routes
var dashboard = require("./routes/dashboard.js")
var users = require("./routes/users-overview.js")
var register = require("./routes/register.js")
var login = require("./routes/login.js")
var update = require("./routes/update.js");
var signout = require("./routes/signout.js")
var removeUser = require("./routes/remove-user.js")
var profile = require("./routes/profile.js")
var deleteUser = require("./routes/delete-user.js")


//Linking mongoose to MongoDB Database called "MotoMatch"
mongoose.connect('mongodb://' + "localhost" + '/' + "MotoMatch", {
  useNewUrlParser: true
})

express()
  .use(express.static("static"))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(expressValidator())

  //Configure sessions
  //https://www.youtube.com/watch?v=zsOGmMuwhT4&t=385s for help with user sessions
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: "Testcookie" /*process.env.SESSION_SECRET*/ ,
    maxAge: 1000 * 60 * 60
  }))

  //Setting view engine to EJS and assigning the views to the folder "view"
  .set("view engine", "ejs")
  .set("views", "view")

  //Routes
  //https://www.youtube.com/watch?v=gnsO8-xJ8rs For help with routing and the basics of expressJS
  .use("/dashboard", dashboard)
  .use("/users", users)
  .use("/login", login)
  .use("/register", register)
  .use("/signout", signout)
  .use("/update", update)
  .use("/users/delete/:id", removeUser)
  .use("/profile", profile)
  .use("/users/delete", deleteUser)


  //Listen on the defined port
  .listen(3008, function () {
    console.log("Server listening on port 3008")
  })