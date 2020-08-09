
const express = require('express');
const adminUploadNotesRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



adminUploadNotesRouter.use(cors());

//Post Request
adminUploadNotesRouter.post('/',function(req, res) {
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
        console.log("Notes Document successfully written!");
        res.send("Done");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
});
  module.exports = adminUploadNotesRouter;