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

//Not used
router.get("/video/:videoId/script/:scriptIndex", (req, res) => {
  let query = { videoId: req.params.videoId };
  let scriptIndex = new Number(req.params.scriptIndex);

  Translation.findOne(query)
    .then((translations) => {
      let scripts = translations[scriptIndex];
      console.log(scripts);
      // res.send(translations);
    })
    .catch((err) => res.status(500).send(err));
});

// vote 순
router.get("/video/:videoId/script/:scriptIndex/vote", (req, res) => {
  var query = { videoId: req.params.videoId };
  let scriptIndex = req.params.scriptIndex;
  console.log("get method");

  Translation.findOne(query)
    .then((translation) => {
      console.log("findOne success");
      let scripts = translation.scripts[scriptIndex];
      console.log(scripts);
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:videoId", (req, res) => {
  console.log("Put New Reply in");
  const { videoId } = req.params;
  const { userId, translated, votes, index } = req.body;

  Translation.findOneAndUpdate({ videoId: videoId }).then(
    (translation, err) => {
      if (err) return res.status(500).send("Cannot find Translation");

      let targetScript = translation.scripts[index];
      if (!targetScript) return res.status(500).send("Cannot find Replies");

      targetScript.subplies.push({
        votes,
        userId,
        translated,
      });

      translation.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(200);
      });
    }
  );
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
