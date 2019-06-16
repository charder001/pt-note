const express = require('express');
const router = express.Router();
var mongoose = require('mongoose')
var multer = require("multer")
var path = require("path")
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js');

const storage = multer.diskStorage({
    destination: './static/images/uploads/',
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const uploadImage = multer({
    storage: storage,
    limits: {
      fileSize: 1000000
    },
    fileFilter: function (req, file, callback) {
      checkFileExt(file, callback);
    }
  }).single('profilePicture');

  function checkFileExt(file, callback) {
    const fileExt = /jpeg|jpg|png|gif/;
    const extName = fileExt.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileExt.test(file.mimetype);
  
    if (mimeType && extName) {
      return callback(null, true);
    } else {
      callback('File is not a image');
    }
  }

router.get('/', function (req, res) {
    res.render("register.ejs")
})

router.post('/', function (req, res) {

    uploadImage(req, res, (error) => {
      if (error) {
        console.log(error);
      } 
      // else {
      //   console.log("rovy " + req.file);
      //   if (req.file == undefined) {
      //     console.log("no file uploaded");
      //   } 
        else {
          var firstName = req.body.firstName
          var lastName = req.body.lastName
          var emailaddress = req.body.emailaddress
          if (req.file){
          var profilePicture = `/images/uploads/${req.file.filename}`
          }
          bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, function (err, hash) {
  
              var newuser = new User()
              newuser.firstName = firstName
              newuser.lastName = lastName
              newuser.userName = emailaddress
              newuser.password = hash
              newuser.profilePicture = profilePicture
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
      //}
    });
  })



module.exports = router;