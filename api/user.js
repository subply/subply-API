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

router.get("/:userId", (req, res) => {
  User.findOne({ UserId: req.params.userId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/join', (req, res)=>{
  const userInfo = req.params;

  const newUser = new User({
    Name: userInfo.name,
    UserId: userInfo.id,
    Password: userInfo.password,
    Nickname: userInfo.nickname,
    ProfileImage: userInfo.profileImage? userInfo.profileImage : null,
  });

  newUser
    .save()
    .then((user)=> { return 1 })
    .catch(err => res.status(500).send(err));
  
})

router.post('/login', (req, res)=>{
  const id = req.params.id;
  const password = req.params.password;

  User.findOne({UserId : id})
  .then((user)=>{
    if(user.password != password) return false;
    res.send({
      id: user.id,
      // 기타 정보
    });
  })
  .catch(err => res.status(500).send(err));

})

// //craete document
const user = new User({
  Name: "ron",
  UserId: "ron12",
  Password: "1234",
  Nickname: "rr",
  ProfileImage: "ss",
  Videos: ["aa", "bb"],
  Translations: ["trans1", "trans2"],
  Votes: ["script2", "script2"],
  ContributedTime: 10,
});

router.post("/", (req, res) => {
  user
    .save()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
