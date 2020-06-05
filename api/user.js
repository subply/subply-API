var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function (req, res, next) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };

  User.find(query)
    .sort({ _id: 1 })
    .exec(function (err, users) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: users });
        console.log(users);
      }
    });
});

router.get("/:userId", (req, res) => {
  User.findOne({ UserId: req.params.userId })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
  let user = req.body;
  user
    .save()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/userId", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:userId", (req, res) => {
  User.findOneAndRemove({ UserId: req.params.userId })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
