
const express = require('express');
const courseRouter = express.Router();
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



courseRouter.use(cors());

  
var db = firebase.firestore();

courseRouter.post('/',function(req, res) {

    const CourseInfo = {
        courseName :req.body.courseName,
        courseStream:req.body.courseStream,
        branch:req.body.branch,
        courseYear:req.body.courseYear,
        courseFees:req.body.courseFees,
    };

    db.collection("Courses").doc().set(CourseInfo)
    .then(function(docRef) {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

});
  module.exports = courseRouter;