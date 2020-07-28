
const express = require('express');
const notesRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");





notesRouter.use(cors());


notesRouter.get('/:courseId',function(request,response) {

  const urlCourseId = request.params.courseId;
   var database = firebase.firestore();

    database.collection("Courses")
    .doc(urlCourseId)
    .collection("Notes")
    .get()
    .then(function(querySnapshot) {
      let DocumentList = [];
      querySnapshot.forEach(function(doc) {
          const DocInfo = {
            docIndex :doc.data().docIndex,
            docTitle:doc.data().docTitle,
            docUrl: doc.data().docUrl,
          };
          DocumentList.push(DocInfo);
        });

        DocumentList.sort(GetSortOrder("docIndex"));
        function GetSortOrder(prop) {    
          return function(a, b) {    
              if (a[prop] > b[prop]) {    
                  return 1;    
              } else if (a[prop] < b[prop]) {    
                  return -1;    
              }    
              return 0;    
          }    
        }    
        response.status(200).json( {DocumentList : DocumentList});
      });
});
  // Get Request
notesRouter.get('/:courseId/:documentId',function(request,response){

  const urlCourseId = request.params.courseId;
  const urlDocumentId = request.params.documentId;

  var db = firebase.firestore();

  db.collection("Courses")
  .doc(urlCourseId)
  .collection("Notes")
  .doc(urlDocumentId)
  .get()
  .then(function(doc) {
    const DocumentInfo = {
      docIndex :doc.data().docIndex,
      docTitle:doc.data().docTitle,
      docUrl: doc.data().docUrl,
    };

    response.status(200).json( {DocumentInfo : DocumentInfo});

  });
});
      

  module.exports = notesRouter;