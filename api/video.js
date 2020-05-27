var express = require("express");
var router = express.Router();
var Video = require("../models/video");

// Index
router.get("/", function (req, res, next) {
  console.log("router activity");
  // console.log(req.query);
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" }; // 1

  Video.find(query)
    .sort({ _id: 1 })
    .exec(function (err, videos) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
        console.log("query error");
      } else {
        res.json({ success: true, data: videos });
        console.log(videos);
        console.log("query success");
      }
    });
});

module.exports = router;
