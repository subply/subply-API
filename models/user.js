var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    
  }},
  { 
  versionKey: false ,
  collection: "User" 
  });

var User = mongoose.model("user", UserSchema);
module.exports = User;
