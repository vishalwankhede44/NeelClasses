const express = require("express");
const checkAccess = express.Router();

//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

checkAccess.post("/", async (req, res) => {
  const userDetails = {
    id: req.body.uid,
    courseId: req.body.courseId,
  };

  console.log(userDetails);
  var db = firebase.firestore();
  const data = {
    userId: userDetails.id,
  };

  if (data.userId == undefined) {
    res.send("No");
  } else {
    var docRef = db
      .collection("Courses")
      .doc(userDetails.courseId)
      .collection("Users");
    var queryRef = docRef
      .where("userId", "==", data.userId)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          res.send("No");
        } else {
          res.send("Yes");
        }
      });
  }
});

module.exports = checkAccess;
