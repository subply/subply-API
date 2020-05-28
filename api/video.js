var express = require("express");
var router = express.Router();
var Video = require("../models/video"); //모델 호출

router.get("/", async (req, res) => {
  //static model method
  Video.find({})
    .then((videos) => {
      res.send(`find successfully: ${videos}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:videourl", (req, res) => {
  Video.findOne({ videoUrl: req.params.videourl })
    .then((video) => {
      res.send(`find successfully: ${video}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// //craete document
var video = new Video({
  VideoUrl: "harrypotter.com",
  Name: "harryAndMagicstone",
  Thumbnail: "harry.jpg",
});

router.post("/", (req, res) => {
  video.save()
    .then((video) => res.send(video))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
