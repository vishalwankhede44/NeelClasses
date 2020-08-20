import React, { useState, useEffect } from "react";
import axios from "axios";
import "firebase/firestore";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import CourseHeading from "./CourseHeading";
import VideoContainer from "./VideoContainer.js";
import CourseContent from "./CourseContent";
import NotesContainer from "./NotesContainer";
import { useCookies } from "react-cookie";
import Navbar from "../../components/Navbar";

const Course = (props) => {
  const [loading, setLoading] = useState(0);
  const [courseInfo, setCourseInfo] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notesInfo, setNotesInfo] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [cookie, setCookie] = useCookies(["uid", "name", "mobile", "role"]);
  const [loggedIn, setLogin] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (checkLogin()) {
    }
    getDataFromFirebase();
  }, []);

  function checkLogin() {
    if ({ cookie }.cookie.name == undefined) {
      console.log("Log in first");
      setLogin(false);
      return false;
    } else {
      console.log("Already logged in");
      console.log({ cookie }.cookie.role);
      // props.history.push("/");
      setLogin(true);
      return true;
    }
  }

  async function checkAccess() {
    console.log(courseInfo.courseId);
    const uid = { cookie }.cookie.uid;

    const courseId = courseInfo.courseId;
    if (courseId == undefined || uid == undefined) return null;
    const Info = {
      uid: uid,
      courseId: courseId,
    };
    await axios
      .post("http://localhost:5000/checkAccess", Info)
      .then((res) => {
        const newAccess = { ...access };
        console.log(res.data);
        if (res.data == "Yes") {
          newAccess.setAccess(true);
          console.log({ access });
        } else {
          newAccess.setAccess(false);
          console.log(access);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const showVideoContainer = (video) => {
    console.log(access);
    setShowVideo(true);
    setVideoInfo(video);
  };
  const hideVideoContainer = () => {
    setShowVideo(false);
  };

  const showNotesContainer = (notes) => {
    if (access) {
      setShowNotes(true);
      setNotesInfo(notes);
    }
  };
  const hideNotesContainer = () => {
    setShowNotes(false);
  };
  const getDataFromFirebase = async () => {
    try {
      await axios
        .get(
          `https://neelclasses.herokuapp.com/course/${props.match.params.courseId}`,
          {
            onDownloadProgress: (progressEvent) => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setLoading(percentCompleted);
            },
          }
        )
        .then((res) => {
          console.log(res.data.CourseInfo);
          setCourseInfo(res.data.CourseInfo);
        });
    } catch (error) {
      console.log(`Get Error ${error}`);
    }
  };

  if (courseInfo !== null && loading === 100) {
    return (
      <div className="course-detail" id="cd">
        <Navbar />
        <CourseHeading
          course={courseInfo}
          accessMethod={setAccess}
          access={access}
        />
        <CourseContent
          course={courseInfo}
          showVideoMethod={showVideoContainer}
          showNotesMethod={showNotesContainer}
        />
        {showVideo && access ? (
          <VideoContainer video={videoInfo} closeVideo={hideVideoContainer} />
        ) : null}
        {showNotes && access ? (
          <NotesContainer notes={notesInfo} closeNotes={hideNotesContainer} />
        ) : null}
      </div>
    );
  } else {
    return <div>{loadProgressBar()}</div>;
  }
};
export default Course;
