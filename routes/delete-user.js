var express = require('express')
var router = express.Router()
var User = require('../models/user.js');
var mongoose = require('mongoose')

router.get('/', function(req, res) {
  console.log(req.params.id)
    User.remove({
      _id: req.session.user._id
    }, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.redirect("/login")
    })
  })

  module.exports = router;