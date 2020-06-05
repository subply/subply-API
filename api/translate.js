var express = require("express");
var router = express.Router();
var Translate = require("../models/translate");

router.get("/", function (req, res) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };

  Translate.find(query)
    .sort({ _id: 1 })
    .exec(function (err, translates) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: translates });
        console.log(translates);
      }
    });
});

router.get("/:videoId", (req, res) => {
    Translate.findOne({ videoId: req.params.videoId })
    .then((translate) => res.send(translate))
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
  let translate = req.body;
  translate
    .save()
    .then((translate) => res.send(translate))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/:videoId", (req, res) => {
    Translate.findByIdAndUpdate(req.params.videoId, req.body)
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:videoId", (req, res) => {
    Translate.findOneAndRemove({ videoId: req.params.videoId })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
