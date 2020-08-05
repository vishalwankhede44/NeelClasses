
const express = require('express');
const adminUploadRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



adminUploadRouter.use(cors());

adminUploadRouter.get('/',async function(req,res){
  let CourseList = [];
    var db = firebase.firestore();
    await db.collection("Courses").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          const CourseInfo = {
            courseName :doc.data().courseName,
            courseStream:doc.data().courseStream,
            branch:doc.data().branch,
            courseYear:doc.data().courseYear,
            courseFees:doc.data().courseFees,
            courseId :doc.id,
          };
          CourseList.push(CourseInfo);
        });
        setTimeout(
            ()=> res.status(200).json( {CourseList : CourseList}),
            1000
        );
      });
});

module.exports = adminUploadRouter;