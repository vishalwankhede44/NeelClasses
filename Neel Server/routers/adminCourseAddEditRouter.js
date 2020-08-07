const express = require("express");
const adminCourseAddEditRouter = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
var cors = require("cors");
const firebase = require("../firebase");
require("firebase/storage");
require("firebase/firestore");

adminCourseAddEditRouter.use(cors());

// Get Request
adminCourseAddEditRouter.get("/", async function (request, response) {
  let CourseStreamList = [];
  var db = firebase.firestore();
  await db
    .collection("Stream")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const CourseStream = {
          courseStream: doc.id,
        };
        CourseStreamList.push(CourseStream);
      });
      setTimeout(
        () => response.status(200).json({ CourseStreamList: CourseStreamList }),
        1000
      );
    });
});

adminCourseAddEditRouter.get("/:courseStream", async function (request, response) {
    const courseStream = request.params.courseStream;
    let CourseBranchList = [];
    var db = firebase.firestore();
    await db
      .collection("Stream")
      .doc(courseStream)
      .collection("Branch")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const CourseBranch = {
            courseBranch: doc.data().Branch,
          };
          CourseBranchList.push(CourseBranch);
        });
        setTimeout(
          () => response.status(200).json({ CourseBranchList: CourseBranchList }),
          1000
        );
      });
  });

  adminCourseAddEditRouter.get("/:courseStream/:courseBranch", async function (request, response) {
    const courseStream = request.params.courseStream;
    const courseBranch = request.params.courseBranch;
    let CourseYearList = [];
    var db = firebase.firestore();
    await db
      .collection("Stream")
      .doc(courseStream)
      .collection("Year")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const CourseYear = {
            courseYear: doc.data().Year,
          };
          CourseYearList.push(CourseYear);
        });
        setTimeout(
          () => response.status(200).json({ CourseYearList: CourseYearList }),
          1000
        );
      });
  });


adminCourseAddEditRouter.post("/",function(req,res){
  var db = firebase.firestore();
  console.log(req.body);
  db.collection("Courses")
    .doc()
    .set({
      courseName :req.body.courseName,
      courseStream :req.body.courseStream,
      courseBranch :req.body.courseBranch,
      courseYear : req.body.courseYear,
      courseRating :req.body.courseRating,
      coursePrice :req.body.coursePrice
    })
    .then(function (docRef) {
      console.log("Course Document successfully written!");
      setTimeout(()=>
      res.send("Done"),1000
    );
    })
    .catch(function (error) {
      console.error("Error adding Course: ", error);
    });

});
module.exports = adminCourseAddEditRouter;
