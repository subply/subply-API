var express = require("express");
var router = express.Router();
var UserInfo = require("../models/userInfo");

router.get("/", function (req, res, next) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };

  UserInfo.find(query)
    .sort({ _id: 1 })
    .exec(function (err, userInfos) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: userInfos });
        console.log(userInfos);
      }
    });
});

router.get("/:userId", (req, res) => {
    UserInfo.findOne({ userId: req.params.userId })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
  console.log("UserInfo in");
  const { id } = req.body;

  const newUserInfo = new UserInfo({
    userId: id,
    votes: [],
    translate: [],
    contributedTime: 0
  })

  newUserInfo
    .save()
    .then((userInfo) => {
      if(userInfo){
        res.send({result : 1});
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/:userId", (req, res) => {
    UserInfo.findByIdAndUpdate(req.params.userId, req.body)
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:userId", (req, res) => {
    UserInfo.findOneAndRemove({ userId: req.params.userId })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
