var mongoose = require("mongoose");

//스키마 생성
var TranslateSchema = new mongoose.Schema({
    videoId: {
      type: String,
      required: true
    },
    script:[
        [
            {
                type:String,
                type:String,
                type: [
                    {type:String}
                ]
                
            }
        ]
    ]
  },
  { 
    versionKey: false ,
    collection: "Translate" 
  });

var Translate = mongoose.model("translate", TranslateSchema); //모델 생성
module.exports = Translate; //모델 내보내기
