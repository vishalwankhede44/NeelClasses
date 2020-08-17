const express = require("express");
const enrollCourseRouter = express.Router();


//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

enrollCourseRouter.post("/", async (req, res) => {
  const userDetails = {
    id: req.body.uid,
    courseId: req.body.courseId,
  };

  console.log(userDetails);
  var db = firebase.firestore();
  const data = {
    userId: userDetails.id,
  };

  var docRef = db
    .collection("Courses")
    .doc(userDetails.courseId)
    .collection("Users");
  var queryRef = docRef
    .where("userId", "==", data.userId)
    .get()
    .then(function (doc) {
      if (doc.empty) {
        db.collection("Courses")
          .doc(userDetails.courseId)
          .collection("Users")
          .doc()
          .set(data);
        res.send("Done");
      } else {
        res.send("Already");
      }
    });
});

module.exports = enrollCourseRouter;
