var express = require("express");
var router = express.Router();
var Translation = require("../models/translation");

router.get("/", function (req, res) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };

  Translation.find(query)
    .sort({ _id: 1 })
    .exec(function (err, translations) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: translations });
        console.log(translations);
      }
    });
});

router.get("/:videoId", (req, res) => {
  Translation.findOne({ videoId: req.params.videoId })
    .then((translation) => res.send(translation))
    .catch((err) => res.status(500).send(err));
});

//video의 i번째 스크립트의 translations 가져오기.
router.get("/video/:videoId/script/:scriptIndex", (req, res) => {
  let query = { videoId: req.params.videoId };
  let scriptIndex = new Number(req.params.scriptIndex);

  Translation.findOne(query)
    .skip(scriptIndex)
    .then((translations) => res.send(translations))
    .catch((err) => res.status(500).send(err));
});

router.put("/:videoId", (req, res)=>{
  const {videoId} = req.params;
  const {userId, translated, votes, index} = req.body;
  Translation.findOneAndUpdate({videoId : videoId}).then((res)=>{
    res.scripts[index].subplies.push({
      votes,
      userId,
      translated
    });
    
    res.save();
  })


})

router.post("/", (req, res) => {
  let translation = req.body;
  translation
    .save()
    .then((translation) => res.send(translation))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/:videoId", (req, res) => {
  Translation.findByIdAndUpdate(req.params.videoId, req.body)
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:videoId", (req, res) => {
  Translation.findOneAndRemove({ videoId: req.params.videoId })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
