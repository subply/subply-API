var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Nickname: {
    type: String,
    required: true,
  },
  ProfileImage: {
    type: String,
    required: true,
  }},
  { 
  versionKey: false ,
  collection: "User" 
  });

var User = mongoose.model("user", UserSchema);
module.exports = User;
