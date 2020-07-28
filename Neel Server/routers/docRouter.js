
const express = require('express');
const docRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



docRouter.use(cors());


const storage = new Storage({
  projectId: "neelclasses-8e371",
  keyFilename: "./neelclasses-8e371-d011f0d56ec7.json"
});

const bucket = storage.bucket("neelclasses-8e371.appspot.com");
const multer = Multer({
  storage: Multer.memoryStorage(),
  });
  // Get Request
docRouter.get('/',function(req,res){

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
            courseId :doc.id,
          };
          CourseList.push(CourseInfo);
        });
        res.status(200).json( {CourseList : CourseList});
      });
});
      


//Post Request
docRouter.post('/',function(req, res) {
  var db = firebase.firestore();
      const DocInfo = {
        docTitle : req.body.docTitle,
        docIndex :req.body.docIndex,
        docUrl : req.body.docUrl,
        courseInfo: req.body.courseInfo,
        timestamp:req.body.timestamp,
      }

      db.collection("Courses").doc(DocInfo.courseInfo).collection("Notes").doc(DocInfo.docIndex).set(DocInfo)
      .then(function(docRef) {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
});
  module.exports = docRouter;