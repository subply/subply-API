var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Index
router.get("/", function (req, res, next) {
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" }; // 1

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

// //craete document
var user = new User({
  Name: "ron",
  UserId: "ron12",
  Password: "1234",
  Nickname: "rr",
  ProfileImage: "ss",
  Videos: ["aa","bb"],
  Translations: ["trans1","trans2"],
  Votes: ["script2","script2"],
  ContributedTime: 10
  });

router.post("/", (req, res) => {
  user.save()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
