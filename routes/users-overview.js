const express = require('express');
const router = express.Router();
var mongoose = require('mongoose')
var User = require('../models/user.js');

router.get('/', function (req, res) {
    User.find(function (err, docs) {
      res.render("users.ejs", {
        users: docs
      })
    })
  })

module.exports = router;


