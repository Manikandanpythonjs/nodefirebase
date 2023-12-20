const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://esp8622firebase-default-rtdb.firebaseio.com/",
});

app.listen(port, () => {
  console.log("Server Is Running On The Port", port);
});

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/register", async (req, res) => {
  const { Servonum } = req.body;

  try {
    const database = admin.database();

    database
      .ref("/")
      .set({
        isFired: Servonum,
      })
      .then(() => {
        console.log("Data added to Firebase Realtime Database");
      })
      .catch((error) => {
        console.error(
          "Error adding data to Firebase Realtime Database:",
          error
        );
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  res.status(200).json({
    message: "Changed",
  });
});
