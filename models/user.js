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
  profilePhoto: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Videos: [{
    type:String
  }],
  Translations: [{
    type:String
  }],
  Votes: [{
    type:String
  }],
  ContributedTime: {
    type: Number,
    required: true,
  }
  },
  { 
  versionKey: false ,
  collection: "User" 
  });

var User = mongoose.model("user", UserSchema);
module.exports = User;
