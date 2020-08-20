const express = require("express");
const adminUploadVideoRouter = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
var cors = require("cors");
const firebase = require("../firebase");
const { json } = require("express");
require("firebase/storage");
require("firebase/firestore");

adminUploadVideoRouter.use(cors());

adminUploadVideoRouter.post("/",function (req, res) {
  var db = firebase.firestore();
  const VideoInfo = {
    videoTitle: req.body.videoTitle,
    videoUrl: req.body.videoUrl,
    courseInfo: req.body.courseInfo,
    timestamp: req.body.timestamp,
  };
  db.collection("Courses")
    .doc(VideoInfo.courseInfo)
    .collection("Videos")
    .doc(VideoInfo.videoTitle)
    .set(VideoInfo)
    .then(function (docRef) {
      console.log("Video Document successfully written!");
      res.send("Done");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
module.exports = adminUploadVideoRouter;
