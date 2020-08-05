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

  let VideoInfoList = [];
  let NotesInfoList = [];

  // let CourseInfo;
  var db = firebase.firestore();
  await db.collection("Courses")
    .get()
    .then(function (querySnapshot) {
      let CourseInfoList = [];
      querySnapshot.forEach(async function (doc) {
        await Promise.all([
          doc.ref
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
              console.log(NotesList);
            }),
        ]);
        await Promise.all([
          doc.ref
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
              console.log(VideoList);
            }),
        ]);
        // await doc.ref
        //   .collection("Videos")
        //   .get()
        //   .then(function (querySnapshot) {
        //     let VideoList = [];
        //     querySnapshot.forEach(function (doc) {
        //       const VideoInfo = {
        //         videoTitle: doc.data().videoTitle,
        //         videoUrl: doc.data().videoUrl,
        //       };
        //       VideoList.push(VideoInfo);
        //     });
        //     VideoInfoList = VideoList;
        //   });

        // await doc.ref
        //   .collection("Notes")
        //   .get()
        //   .then(function (querySnapshot) {
        //     let NotesList = [];
        //     querySnapshot.forEach(function (doc) {
        //       const NotesInfo = {
        //         docIndex: doc.data().docIndex,
        //         docTitle: doc.data().docTitle,
        //         docUrl: doc.data().docUrl,
        //       };
        //       NotesList.push(NotesInfo);
        //     });
        //     NotesInfoList = NotesList;
        //   });

        const CourseInfo = {
          courseName: doc.data().courseName,
          courseStream: doc.data().courseStream,
          branch: doc.data().branch,
          courseYear: doc.data().courseYear,
          courseFees: doc.data().courseFees,
          courseId: doc.id,
          coursePrice: doc.data().coursePrice,
          courseRating: doc.data().courseRating,
          // courseVideos: VideoInfoList,
          // courseNotes: NotesInfoList,
        };
        console.log(CourseInfo);
        CourseInfoList.push(CourseInfo);
      });
    });
  setTimeout(
    () => response.status(200).json({ CourseInfoList: CourseInfoList }),
    2000
  );
});

module.exports = adminCoursesRouter;
