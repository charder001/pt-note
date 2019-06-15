const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {
      type: String,
      unique: true
    },
    password: String,
    profilePicture: String
  })

 module.exports = mongoose.model("users", userSchema)