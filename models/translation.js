var mongoose = require("mongoose");

//스키마 생성
var TranslationSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    scripts: [
      {
        raw: String,
        subplies: [
          {
            userId: String,
            translated: String,
            votes: [],
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
    collection: "Translation",
  }
);

var Translation = mongoose.model("translation", TranslationSchema); //모델 생성
module.exports = Translation; //모델 내보내기
