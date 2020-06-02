var express = require("express");
var router = express.Router();
var Video = require("../models/video"); //모델 호출

router.get("/", async (req, res) => {
  //static model method
  Video.find({})
    .then((videos) => {
      res.send(videos);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:videourl", (req, res) => {
  Video.findOne({ VideoUrl: req.params.videourl })
    .then((video) => {
      res.send(video);
      console.log(req.params.videourl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  let video = req.body;
  video
    .save()
    .then((video) => res.send(video))
    .catch((err) => res.status(500).send(err));
});

// //craete document
// var video = new Video({
//   VideoUrl: "harrypotter.com",
//   Name: "harryAndMagicstone",
//   Thumbnail: "harry.jpg",
// });

// router.post("/", (req, res) => {
//   video
//     .save()
//     .then((video) => res.send(video))
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

//update
router.patch("/:videourl", (req, res) => {
  Video.findByIdAndUpdate(req.params.videourl, req.body)
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => res.status(500).send(err));
});

router.delete("/:videourl", (req, res) => {
  Video.findOneAndDelete({ VideoUrl: req.params.videourl })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err));
  // try {
  //   let deletedVideo = Video.findOneAndDelete({ VideoUrl: req.params.videourl });
  //   if (deletedVideo) {
  //     res.send({ success: true });
  //     console.log("deletedVideo :" + deletedVideo);
  //   }
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

module.exports = router;
