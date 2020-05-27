var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  _id: { $oid: "5ec54e95736f614c0ff185df" },
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
  },
  Videos: ["dd", "dd"],
  Translations: ["ss", "ab"],
  Votes: ["ss", "ss"],
  ContributedTime: {
    type: Double,
    required: true,
  },
});

var User = mongoose.model("user", UserSchema);
module.exports = User;

// var UserSchema = mongoose.Schema({
//   _id: { $oid: "5ec54e95736f614c0ff185df" },
//   Name: "kim",
//   UserId: "kim12",
//   Password: "1234",
//   Nickname: "kim",
//   ProfileImage: "abc",
//   Videos: ["dd", "dd"],
//   Translations: ["ss", "ab"],
//   Votes: ["ss", "ss"],
//   ContributedTime: { $numberDouble: "1111.11" },
// });
