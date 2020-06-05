var mongoose = require("mongoose");

var UserInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videos: [{
    type:String
  }],
  votes: [{
    type:String
  }],
  translate: [{
    type:String
  }],
  ContributedTime: {
    type: Number,
    required: true,
  }
},
  { 
  versionKey: false ,
  collection: "UserInfo" 
  });

var UserInfo = mongoose.model("userInfo", UserInfoSchema);
module.exports = UserInfo;
