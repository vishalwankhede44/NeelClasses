
const express = require('express');
const videoRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



videoRouter.use(cors());

  // Get Request
videoRouter.get('/',function(req,res){

    var db = firebase.firestore();
    db.collection("Courses").get().then(function(querySnapshot) {
      let CourseList = [];
      querySnapshot.forEach(function(doc) {
          const CourseInfo = {
            courseName :doc.data().courseName,
            courseStream:doc.data().courseStream,
            branch:doc.data().branch,
            courseYear:doc.data().courseYear,
            courseFees:doc.data().courseFees,
            courseId:doc.id,
          };
          CourseList.push(CourseInfo);
        });
        res.status(200).json( {CourseList : CourseList});
      });
});
      


//Post Request
videoRouter.post('/',function(req, res) {
  var db = firebase.firestore();
      const VideoInfo = {
        videoTitle : req.body.videoTitle,
        videoUrl : req.body.videoUrl,
        courseInfo: req.body.courseInfo,
        timestamp:req.body.timestamp,
      }
      db.collection("Courses").doc(VideoInfo.courseInfo).collection("Videos").doc(VideoInfo.videoTitle).set(VideoInfo)
      .then(function(docRef) {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
});
  module.exports = videoRouter;