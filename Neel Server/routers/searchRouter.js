const express = require('express');
const searchRouter = express.Router();
const { Storage }  = require('@google-cloud/storage');
const Multer = require('multer')
var cors = require('cors');
const firebase = require("../firebase");
require('firebase/storage');
require("firebase/firestore");





searchRouter.use(cors());


searchRouter.get('/:searchString',async function(request,response) {

  const searchCourseString = request.params.searchString;

    var db = firebase.firestore();
   await db.collection("Courses").get().then(async function(querySnapshot) {
      let CourseList = [];
      querySnapshot.forEach(function(doc) {
        var compareString = doc.data().courseName;
          if(compareString.toUpperCase().includes(searchCourseString.toUpperCase())){
            if(doc.data().courseStatus == "SHOW" || doc.data().courseStatus == undefined){
            const CourseInfo = {
                courseName :doc.data().courseName,
                courseStream:doc.data().courseStream,
                courseField :doc.data().courseField,
                courseBranch:doc.data().courseBranch,
                courseYear:doc.data().courseYear,
                courseFees:doc.data().courseFees,
                courseId:doc.id,
                coursePrice:doc.data().coursePrice,
                courseRating:doc.data().courseRating,
                courseDescription:doc.data().courseDescription,
                courseInstructor:doc.data().courseInstructor,
            };
            CourseList.push(CourseInfo);
          }
          }

        });
        console.log(CourseList);
        setTimeout(()=>
        response.status(200).json( {CourseList : CourseList}),1000);
      });
});
module.exports = searchRouter;