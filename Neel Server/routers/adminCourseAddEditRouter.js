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
    console.log(courseStream)
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
          console.log(CourseBranchList);
        });
        setTimeout(
          () => response.status(200).json({ CourseBranchList: CourseBranchList }),
          1000
        );
      });
  });

module.exports = adminCourseAddEditRouter;
