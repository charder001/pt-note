var express = require('express')
var router = express.Router()
var User = require('../models/user.js');

router.delete('/', function(req, res) {
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