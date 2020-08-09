const express = require("express");
const courseRouter = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
var cors = require("cors");
const firebase = require("../firebase");
require("firebase/storage");
require("firebase/firestore");

courseRouter.use(cors());

// Get Request
courseRouter.get("/:courseId", async function (request, response) {
  const courseId = request.params.courseId;
  let CourseInfo;
  let VideoInfoList = [];
  let NotesInfoList = [];

  var db = firebase.firestore();
  await db
    .collection("Courses")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        var compareString = doc.data().courseName;
        if (compareString.toUpperCase() === courseId.toUpperCase()) {
          await doc.ref
            .collection("Videos")
            .get()
            .then(function (querySnapshot) {
              let VideoList = [];
              querySnapshot.forEach(function (doc) {
                const VideoInfo = {
                  videoTitle: doc.data().videoTitle,
                  videoUrl: doc.data().videoUrl,
                };
                VideoList.push(VideoInfo);
              });
              VideoInfoList = VideoList;
            });

          await doc.ref
            .collection("Notes")
            .get()
            .then(function (querySnapshot) {
              let NotesList = [];
              querySnapshot.forEach(function (doc) {
                const NotesInfo = {
                  docIndex: doc.data().docIndex,
                  docTitle: doc.data().docTitle,
                  docUrl: doc.data().docUrl,
                };
                NotesList.push(NotesInfo);
              });
              NotesInfoList = NotesList;
            });

          CourseInfo = {
            courseName: doc.data().courseName,
            courseStream: doc.data().courseStream,
            branch: doc.data().branch,
            courseYear: doc.data().courseYear,
            courseFees: doc.data().courseFees,
            courseId: doc.id,
            coursePrice: doc.data().coursePrice,
            courseRating: doc.data().courseRating,
            courseVideos: VideoInfoList,
            courseNotes: NotesInfoList,
          };
          console.log(CourseInfo);
        }
      });
      setTimeout(
        () => response.status(200).json({ CourseInfo: CourseInfo }),
        2000
      );
    });
});

module.exports = courseRouter;
