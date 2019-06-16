var express = require('express')
var router = express.Router()
var User = require('../models/user.js');
var mongoose = require('mongoose')

router.delete('/', function(req, res) {
  console.log(req.params.id)
    User.remove({
      _id: ObjectId(req.params.id)
    }, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.redirect("/dashboard")
    })
  })

  module.exports = router;