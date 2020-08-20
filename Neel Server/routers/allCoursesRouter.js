
const express = require('express');
const allCoursesRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");



allCoursesRouter.use(cors());




  // Get Request
allCoursesRouter.get('/',async function(request,response){

    let VideoInfoList = [];
    let NotesInfoList = [];
    let CourseInfoList=[];
    let CourseInfo;
    var db = firebase.firestore();
    await db.collection("Courses").get().then(async function(querySnapshot) {
       
        querySnapshot.forEach(async function(doc) {

          if(doc.data().courseStatus == "SHOW" || doc.data().courseStatus == undefined) {

          await doc.ref.collection("Videos").get().then(function(querySnapshot) {
            let VideoList = [];
           querySnapshot.forEach(function(doc){
              const VideoInfo = {
                videoTitle :doc.data().videoTitle,
                videoUrl :doc.data().videoUrl
              }
              VideoList.push(VideoInfo);
           })   
            VideoInfoList = VideoList;
          });
          
          await doc.ref.collection("Notes").get().then(function(querySnapshot) {
            let NotesList = [];
            querySnapshot.forEach(function(doc){
              const NotesInfo = {
                docIndex : doc.data().docIndex,
                docTitle: doc.data().docTitle,
                docUrl: doc.data().docUrl
              }
              NotesList.push(NotesInfo)
            })
            NotesInfoList = NotesList;
            
           });

            CourseInfo = {
                courseName :doc.data().courseName,
                courseStream:doc.data().courseStream,
                courseBranch:doc.data().courseBranch,
                courseYear:doc.data().courseYear,
                courseId:doc.id,
                coursePrice:doc.data().coursePrice,
                courseRating:doc.data().courseRating,
                courseDescription:doc.data().courseDescription,
                courseInstructor:doc.data().courseInstructor,
                courseVideos : VideoInfoList,
                courseNotes : NotesInfoList,
            };
            CourseInfoList.push(CourseInfo);
            console.log(CourseInfoList.length);
          }
        });
   
        
        
      });
      setTimeout(() => 
      response.status(200).json( {CourseInfoList : CourseInfoList}), 2000);  
});
      
  module.exports = allCoursesRouter;