const express = require("express");
const adminCoursesRouter = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
var cors = require("cors");
const firebase = require("../firebase");
require("firebase/storage");
require("firebase/firestore");

adminCoursesRouter.use(cors());

// Get Request
adminCoursesRouter.get("/", async function (request, response) {
  let CourseInfoList = [];
  var db = firebase.firestore();
  await db
    .collection("Courses")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if(doc.data().courseStatus == "SHOW" || doc.data().courseStatus == undefined){
        const CourseInfo = {
          courseName: doc.data().courseName,
          courseStream: doc.data().courseStream,
          courseBranch: doc.data().courseBranch,
          courseYear: doc.data().courseYear,
          courseId: doc.id,
          coursePrice: doc.data().coursePrice,
          courseRating: doc.data().courseRating,
          courseField : doc.data().courseField,
          courseDescription:doc.data().courseDescription,
          courseInstructor:doc.data().courseInstructor,
        };
        console.log(CourseInfo);
        CourseInfoList.push(CourseInfo);
      }
      });
      setTimeout(
        () => response.status(200).json({ CourseInfoList: CourseInfoList }),
        2000
      );
    });
});

module.exports = adminCoursesRouter;
