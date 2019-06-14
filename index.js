require("dotenv").config()
//setting package requirements
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var slug = require("slug")
var path = require("path")
var find = require("array-find")
var mongojs = require("mongojs")
var mongoose = require('mongoose')

var bcryptjs = require("bcryptjs")


//linking MongoJS to MongoDB Database called "MotoMatch" with the collection "users" 
var db = mongojs("MotoMatch", ["users"])
var ObjectId = mongojs.ObjectID

//Linking mongoose to MongoDB Database called "MotoMatch"
mongoose.connect('mongodb://' + "localhost" + '/' + "MotoMatch", {
  useNewUrlParser: true
})

//Defining data scheme
var Schema = mongoose.Schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {type:String, unique:true},
  password: String
})

var User = mongoose.model("users", userSchema)

express()
  .use(express.static("static"))
  .use(bodyParser.urlencoded({
    extended: true
  }))

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
  .get("/dashboard", dashboard)
  .get("/users", users)
  .get("/login", login)
  .get("/register", register)
  .get("/signout", signout)
  .post("/login", postlogin)
  .post("/register", postregister)
  .delete("/users/delete/:id", removeuser)

  //Listen on the defined port
  .listen(3000, function () {
    console.log("Server listening on port 3008")
  })

//Get "/dashboard"
function dashboard(req, res) {
  if (!req.session.user) {
    return res.status(401).redirect("login")
  }
  db.users.find(function (err, docs) {
    return res.status(200).render("dashboard.ejs", {
      users: docs,
      currentUser: req.session.user
    })
  })
}

//Get "/users"
function users(req, res) {
  db.users.find(function (err, docs) {
    res.render("users.ejs", {
      users: docs
    })
  })
}

//Get "/register"
function register(req, res) {
  res.render("register.ejs")
}

//Post "/register" 
function postregister(req, res) {
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var emailaddress = req.body.emailaddress
  bcryptjs.genSalt(10, function(err, salt) {
    bcryptjs.hash(req.body.password, salt, function(err, hash) {

      var newuser = new User()
      newuser.firstName = firstName
      newuser.lastName = lastName
      newuser.userName = emailaddress
      newuser.password = hash
      newuser.save(function (err, savedUser) {
        if (err) {
          console.log(err)
          return res.status(500).send()
        }
      console.log(newuser)
      return res.status(200).redirect("/login")

    })
  });
});

}

//Get "/login"
function login(req, res) {
  res.render('login.ejs')
}

//Post "/login"
function postlogin(req, res) {
  var username = req.body.userName
  var password = req.body.password
  
  User.findOne({userName:username}, function(err, user){    
    bcryptjs.compare(password, user.password, function(err, user){
      if (err) {
        console.log(err)
        res.status(500).send()
      }
      else if(user == true){
        req.session.user = user;
        console.log("login succesful")
        res.redirect("/dashboard")
        res.status(200).send()
      }
      else{
        console.log("login unsuccessful")
        res.status(404).redirect("/login")
      }
    });
  });
}

//Get "/signout"
function signout(req, res) {
  req.session.destroy()
  console.log("signed out")
  res.redirect("/login")
  return res.status(200).send()
}

//Delete "/users/delete/:id"
function removeuser(req, res) {
  db.users.remove({
    _id: ObjectId(req.params.id)
  }, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.redirect("/dashboard")
  })
}