
const express = require('express');
const playVideo = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");





playVideo.use(cors());


playVideo.get('/:courseId',function(request,response) {

  const urlCourseId = request.params.courseId;
   var database = firebase.firestore();

    database.collection("Courses")
    .doc(urlCourseId)
    .collection("Videos")
    .get()
    .then(function(querySnapshot) {
      let VideoList = [];
      querySnapshot.forEach(function(doc) {
        const VideoInfo = {
            videoTitle:doc.data().videoTitle,
            videoUrl: doc.data().videoUrl,
          };
          VideoList.push(VideoInfo);
        });

        VideoList.sort(GetSortOrder("videoTitle"));
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
        response.status(200).json( {VideoList : VideoList});
      });
});
  // Get Request
playVideo.get('/:courseId/:videoId',function(request,response){

  const urlCourseId = request.params.courseId;
  const urlVideoId = request.params.videoId;

  var db = firebase.firestore();

  db.collection("Courses")
  .doc(urlCourseId)
  .collection("Videos")
  .doc(urlVideoId)
  .get()
  .then(function(doc) {
    const VideoInfo = {
      videoTitle:doc.data().videoTitle,
      videoUrl: doc.data().videoUrl,
    };
    response.status(200).json( {VideoInfo : VideoInfo});
  });
});
      

  module.exports = playVideo;