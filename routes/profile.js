var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user.js');

router.get('/', function profile(req, res) {
    if (!req.session.user) {
      return res.status(401).redirect("login")
    }
    User.find({}, function (err, docs) {
        console.log(req.session.user)
        return res.status(200).render("profile.ejs", {
            users: docs,
            currentUser: req.session.user    
        })
    })
})

module.exports = router;