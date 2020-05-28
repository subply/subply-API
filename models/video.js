var mongoose = require("mongoose");

//스키마 생성
var VideoSchema = new mongoose.Schema({
    VideoUrl: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    },
    Thumbnail: {
      type: String,
      required: true
    },
  },
  { 
    versionKey: false ,
    collection: "Video" 
  });

var Video = mongoose.model("video", VideoSchema); //모델 생성
module.exports = Video; //모델 내보내기
