const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = Express();

const cors = require("cors");
const CORS_URL = "http://49.50.167.179:4200";
const corsOptions = {
  origin: CORS_URL,
  Credentials: true,
};
const CONNECTION_URL =
  "mongodb+srv://admin:1234@cluster0-d2pqt.gcp.mongodb.net/subply?retryWrites=true&w=majority";
mongoose.set("useFindAndModify", false);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, enctype"
  );
  next();
});

app.use(cors(corsOptions));
app.use(Express.json()); // Make sure it comes back as json
app.use("/translation", require("./api/translation.js"));
app.use("/user", require("./api/user.js"));
app.use("/userInfo", require("./api/userInfo.js"));

mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose connected");
});

// Port setting
var port = 3000;
const HOSTNAME = "10.41.165.149";
app.listen(port, HOSTNAME, function () {
  console.log(`server on:) ${HOSTNAME} :  ${port}`);
});
