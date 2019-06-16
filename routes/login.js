var express = require('express')
var router = express.Router()
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js');
var expressValidator = require('express-validator')
var session = require('express-session')

// Validation
//Get "/login"
router.get('/', function(req, res) {
    res.render('login.ejs')
})

// //Post "/login"
// router.post('/', function postlogin(req, res) {


//   function validate(req, res){

//     return new Promise(function(resolve, reject){
    

//     // Validate
//     req.check('emailaddress', 'Invalid email address').isEmail()
//     req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword)

//     var errors = req.validationErrors();
//     if(errors){
      
//       req.session.errors = errors
//       console.log(req.session.errors)
//       req.render('/login', {errors:req.session.errors})
//       reject(new Error('User input is not valid yet'));
//     }else{
//       resolve();
//     }
//   })
// }

//     validate().then(function(){
//       var username = req.body.userName
//       var password = req.body.password

//       User.findOne({
//         userName: username
//       }, function (err, user) {

//           if (user) {
//             bcryptjs.compare(password, user.password, function (err, user) {
    
//             console.log("login succesful")
//             res.redirect("/dashboard")
//             return res.status(200).send()
//           })
//           req.session.user = user;
//         } else {
//           console.log("login unsuccessful")
//           return res.status(404).redirect("/login")
//         }
//       })
//     })
//     .catch(function(error){
//       console.log(error);
//     })
//   })
  

  
  module.exports = router;