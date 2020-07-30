const express = require('express');
const searchRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");





searchRouter.use(cors());


searchRouter.get('/:searchString',function(request,response) {

  const searchCourseString = request.params.searchString;
   var database = firebase.firestore();

    var db = firebase.firestore();
    db.collection("Courses").get().then(function(querySnapshot) {
      let CourseList = [];
      querySnapshot.forEach(function(doc) {

          if(doc.data().courseName == searchCourseString){
            const CourseInfo = {
                courseName :doc.data().courseName,
                courseStream:doc.data().courseStream,
                branch:doc.data().branch,
                courseYear:doc.data().courseYear,
                courseFees:doc.data().courseFees,
                courseId:doc.id,
                coursePrice:doc.data().coursePrice,
                courseRating:doc.data().courseRating,
            };
            CourseList.push(CourseInfo);
          }

        });

       CourseList.sort(GetSortOrder("docIndex"));
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
        response.status(200).json( {CourseList : CourseList});
      });
});
module.exports = searchRouter;