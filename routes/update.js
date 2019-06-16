var express = require('express')
var router = express.Router()
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js');


router.get('/', function(req, res) {
    if (!req.session.user) {
      return res.status(401).redirect("login")
    }
    User.find(function (err, docs) {
        return res.status(200).render("update", {
            users: docs,
            currentUser: req.session.user
        })
    })
})

router.post('/', function(req, res) {
    var currentId = req.session.user._id
    var id = currentId
    //console.log(currentId)
    
    User.findOne({_id: id}, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).send()
        } else {
            if (!user) {
                console.log("edit unsuccessful")
                res.status(404).send()
            } else {
              if (req.body.firstName) {
                user.firstName = req.body.firstName
              }
              if (req.body.lastName) {
                user.lastName = req.body.lastName
              }
              if (req.body.password) {
                bcryptjs.genSalt(10, function (err, salt) {
                  bcryptjs.hash(req.body.password, salt, function (err, hash) {
                    user.password = hash
                  })
                })
              }
              user.save(function (err, updatedObject) {
                if (err) {
                  console.log(err)
                  res.status(500).send()
                } else {
                  res.redirect("dashboard")
                }
              })
            }
          }
        })
      })
  

  module.exports = router;