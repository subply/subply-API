var mongoose = require("mongoose");

var VideoSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  VideoUrl: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Tumbnail: {
    type: String,
    required: true,
  },
});

var Video = mongoose.model("video", VideoSchema);
module.exports = Video;
