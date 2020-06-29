var express = require("express");
var router = express.Router();
var Translation = require("../models/translation");

router.get("/", function (req, res) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };

  Translation.find(query)
    .sort({ _id: -1 })
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

router.put("/:videoId", (req, res) => {
  const { videoId } = req.params;
  const { userId, translated, votes, index } = req.body;
  console.log("Put New Reply in : " + videoId);

  Translation.findOne({ videoId: videoId })
    .then((translation) => {
      console.log("메서드 결과 찾은 tran의 videoId: " + translation.videoId);
      let targetScript = translation.scripts[index];

      if (!targetScript) {
        return res.status(500).send("Cannot find Replies");
      }
      targetScript.subplies.push({
        votes,
        userId,
        translated,
      });

      translation.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send(translation);
      });
    })
    .catch((err) => {
      return res.status(500).send("Cannot find Translation");
    });
});

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
  console.log(req.params.videoId);
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

router.patch("/subply/:videoId", (req, res) => {
  const { videoId } = req.params;
  const { scriptIndex, _id } = req.body;

  Translation.findOne({ videoId: videoId })
    .then((translation) => {
      let targetScript = translation.scripts[scriptIndex];
      targetScript.subplies.pull({ _id: _id });

      translation.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send(translation);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Cannot find Translation");
    });
});

module.exports = router;
