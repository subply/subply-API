var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Index
router.get("/", function (req, res, next) {
  console.log("router activity");
  // console.log(req.query);
  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: "i" }; // 1

  User.find(query)
    .sort({ _id: 1 })
    .exec(function (err, users) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
        console.log("query error");
      } else {
        res.json({ success: true, data: users });
        console.log(users);
        console.log("query success");
      }
    });
});

module.exports = router;
