var mongoose = require("mongoose");

var UserInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  votes: [{
    type: String
  }],
  translate: [{
    videoId: String,
    title: String,
    subplies: [{
      raw: String,
      translate: String
    }]
  }],
  contributedTime: {
    type: Number,
    required: true,
  }
},
  {
    versionKey: false,
    collection: "UserInfo"
  });

var UserInfo = mongoose.model("userInfo", UserInfoSchema);
module.exports = UserInfo;
