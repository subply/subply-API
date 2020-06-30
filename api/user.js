const express = require("express");
const router = express.Router();
let User = require("../models/user");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

router.get("/:userId", (req, res) => {
  console.log("mypage in");
  User.findOne({ userId: req.params.userId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/", upload.single("profilePhoto"), (req, res) => {
  console.log("Join in");

  const { name, id, password, nickname } = req.body;
  const newUser = new User({
    name,
    userId: id,
    password,
    nickname,
    profilePhoto: req.file ? req.file.buffer : null,
  });

  newUser
    .save((err) => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(200);
    })

});

router.post("/login", async (req, res) => {
  console.log("login in");
  const { id, password } = req.body;
  try {
    const chk = await User.findOne({ userId: id }).then((user) => {
      if (!user) res.sendStatus(401).send("User Not Found");
      return user.password === password;
    });
    if (!chk) return res.send({ login: 0 });
    res.send({ login: 1 });
  } catch (e) {
    res.sendStatus(500).send("Server - login error");
  }
});

router.patch("/:userId", (req, res) => {
  const query = { userId: req.params.userId };
  const altered = {
    password: req.body.password,
    nickname: req.body.nickname,
    profilePhoto: req.body.profilePhoto,
  };

  User.findOneAndUpdate(query, altered, { new: true }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(doc);
    }
  });
});

module.exports = router;
