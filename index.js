const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL =
  "mongodb+srv://admin:1234@cluster0-d2pqt.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "subply";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);

      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

app.get("/api/video", (request, response) => {
  collection = database.collection("Video");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/api/user", (request, response) => {
  collection = database.collection("User");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/api/translate", (request, response) => {
  collection = database.collection("Translate");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/api/RawScript", (request, response) => {
  collection = database.collection("RawScript");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});
