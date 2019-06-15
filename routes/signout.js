var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function (req, res) {
    req.session.destroy()
    console.log("signed out")
    res.redirect("/login")
    return res.status(200).send()
  })

module.exports = router;





