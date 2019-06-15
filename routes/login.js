var express = require('express')
var router = express.Router()
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js');


router.get('/', function(req, res) {
    res.render('login.ejs')
})
//Get "/login"

//Post "/login"
router.post('/', function postlogin(req, res) {
    var username = req.body.userName
    var password = req.body.password
  
    User.findOne({
      userName: username
    }, function (err, user) {
      // console.log(user.firstName)
      if (user) {
        bcryptjs.compare(password, user.password, function (err, user) {
  
          console.log("login succesful")
          res.redirect("/dashboard")
          return res.status(200).send()
  
        })
        req.session.user = user;
      } else {
        console.log("login unsuccessful")
        return res.status(404).redirect("/login")
      }
    })
  })

  
  module.exports = router;