const express = require("express");
const app = express();
const path = require("path");
const videoRouter = require("./routers/videoRouter");
const courseAddRouter = require("./routers/courseAddRouter");
const loginRouter = require("./routers/auth");
const signUpRouter = require("./routers/signup");
const addUserRouter = require("./routers/adduser");
const docRouter = require("./routers/docRouter");
const notesRouter = require("./routers/viewNotesRouter");
const playVideo = require("./routers/playVideoRouter");
const searchRouter = require("./routers/searchRouter");
const courseRouter = require("./routers/courseRouter");
const allCoursesRouter = require("./routers/allCoursesRouter");
const getUserRouter = require("./routers/getUser");
const enrollCourseRouter = require("./routers/enrollCourse");
const checkAccess = require("./routers/checkAccess");
const adminCoursesRouter = require("./routers/adminCoursesRouter");
const adminUploadRouter = require("./routers/adminUploadRouter");
const adminUploadNotesRouter = require("./routers/adminUploadNotesRouter");
const adminUploadVideoRouter = require("./routers/adminUploadVideoRouter");
const adminCourseAddEditRouter = require("./routers/adminCourseAddEditRouter");
const payment = require("./routers/payment");

const PORT = process.env.PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");



const logger = require("morgan");
const cors = require("cors");

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/enrollCourse", enrollCourseRouter);
app.use("/checkAccess", checkAccess);
app.use("/login", loginRouter);
app.use("/uploadVideo", videoRouter);
app.use("/signup", signUpRouter);
app.use("/addcourse", courseAddRouter);
app.use("/adduser", addUserRouter);
app.use("/uploadnotes", docRouter);
app.use("/notes", notesRouter);
app.use("/video", playVideo);
app.use("/courses/search", searchRouter);
app.use("/course", courseRouter);
app.use("/courses", allCoursesRouter);
app.use("/getUser", getUserRouter);
app.use("/admin/courses", adminCoursesRouter);
app.use("/admin/upload", adminUploadRouter);
app.use("/admin/upload/notes", adminUploadNotesRouter);
app.use("/admin/upload/video", adminUploadVideoRouter);
app.use("/admin/course", adminCourseAddEditRouter);
app.use("/admin/addcourse", adminCourseAddEditRouter);
app.use("/admin/editcourse", adminCourseAddEditRouter);
app.use("/payment", payment);
app.use("/callback", payment);

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
