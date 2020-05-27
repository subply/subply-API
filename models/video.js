var mongoose = require("mongoose");

// var VideoSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   VideoUrl: {
//     type: String,
//     required: true,
//   },
//   Name: {
//     type: String,
//     required: true,
//   },
//   Thumbnail: {
//     type: String,
//     required: true,
//   },
// });

var VideoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  VideoUrl: String,
  Name: String,
  Thumbnail: String,
});

var Video = mongoose.model("video", VideoSchema);
module.exports = Video;
