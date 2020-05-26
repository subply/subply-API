// var express = require("express");
// var app = express();

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://admin:1234@cluster0-d2pqt.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("subply").collection("User");
//   // perform actions on the collection object
//   client.close();
// });

// var express = require("express");
// var app = express();
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://admin:1234@cluster0-d2pqt.gcp.mongodb.net/test?retryWrites=true&w=majority"
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("mongoose connected");
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

// // DB setting
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://admin:1234@cluster0-d2pqt.gcp.mongodb.net/test?retryWrites=true&w=majority"
);
var db = mongoose.connection;

db.once("open", function () {
  console.log("DB connected");
});

db.on("error", function (err) {
  console.log("DB ERROR : ", err);
});

// Other settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  // 1
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

// API
app.use("/api/video", require("./api/subply"));

// Port setting
var port = 3000;
app.listen(port, function () {
  console.log("server on:) http://localhost:" + port);
});
