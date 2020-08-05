import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import "firebase/storage";
import { withRouter, Link } from "react-router-dom";
import { Alert } from "reactstrap";

const storage = firebase.storage();

const Form = (props) => {
  const [videoTitle, setTitle] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [file, setFile] = useState("");

  const [courseInfo, setCourseInfo] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [docIndex, setDocIndex] = useState("");

  const [videosNotes, setVideosNotes] = useState(null);
  const [status, setStatus] = useState("NotDone");
  const [courseName, setCourseName] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    try {
      await axios.get("http://localhost:5000/admin/upload").then((res) => {
        setCourseList(res.data.CourseList);
      });
    } catch (error) {
      console.log(`Get Error ${error}`);
    }
  };

  const onCourseSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setCourseInfo(event.nativeEvent.target[index].value);
    setCourseName(event.nativeEvent.target[index].text);
  };

  const onVideosNotesSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setVideosNotes(event.nativeEvent.target[index].value);
  };

  const onSubmit = async (event) => {
    props.history.push(`upload/${videosNotes !== "Notes" ? "video" : "notes"}`);
    event.preventDefault();
    const uploadTask = storage
      .ref(`${videosNotes !== "Notes" ? "Videos" : "Notes"}/${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadPercentage = Math.floor(
          (snapshot.bytesTransferred * 100) / snapshot.totalBytes
        );
        setUploadPercentage(uploadPercentage);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${videosNotes !== "Notes" ? "Videos" : "Notes"}`)
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            if (videosNotes !== "Notes") {
              if (url != null && courseInfo != null && videoTitle != null) {
                var timestamp1 = new Date();
                const VideoInfo = {
                  videoTitle: videoTitle,
                  videoUrl: url,
                  courseInfo: courseInfo,
                  timestamp: timestamp1.toString(),
                };
                try {
                  await axios
                    .post("http://localhost:5000/admin/upload/video", VideoInfo)
                    .then((res) => {
                      console.log(res.data);
                      if (res.data === "Done") {
                        setStatus(res.data);
                      } else {
                        setStatus("NotDone");
                      }
                    });
                } catch (error) {
                  console.log(`Post Error for Video ${error}`);
                }
              } else {
                console.log("Course Info Not Selected");
              }
            } else {
              if (url != null && courseInfo != null && docTitle != null) {
                var timestamp2 = new Date();
                const DocInfo = {
                  docTitle: docTitle,
                  docIndex: docIndex,
                  docUrl: url,
                  courseInfo: courseInfo,
                  timestamp: timestamp2.toString(),
                };
                try {
                  await axios
                    .post("http://localhost:5000/admin/upload/notes", DocInfo)
                    .then((res) => {
                      console.log(res.data);
                      if (res.data === "Done") {
                        setStatus(res.data);
                      } else {
                        setStatus("NotDone");
                      }
                    });
                } catch (error) {
                  console.log(`Post Error for Notes ${error}`);
                }
              }
            }
          });
      }
    );
  };

  if (status === "NotDone")
    return (
      <div>
        <div className="container">
          <form>
            <div style={{ width: "30%" }} className="form-group">
              <select
                className="form-control"
                onChange={onVideosNotesSelect}
                defaultValue="Default"
              >
                <option className="placeholder" disabled value="Default">
                  Select Videos / Notes
                </option>
                <option value="Notes">Notes</option>
                <option value="Videos">Videos</option>
              </select>
            </div>
            {videosNotes !== "Notes" ? (
              <div>
                <div style={{ width: "30%" }} className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="videoTitle"
                    placeholder="Video Title"
                    value={videoTitle}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div style={{ width: "30%" }} className="form-group">
                  <select
                    className="form-control"
                    onChange={onCourseSelect}
                    defaultValue="Default"
                  >
                    <option className="placeholder" disabled value="Default">
                      Select Course
                    </option>
                    {courseList.map((course) => (
                      <option value={course.courseId} key={course.courseId}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ width: "30%" }} className="form-group">
                  <input type="file" name="selectedFile" onChange={onChange} />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ width: "30%" }} className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="docTitle"
                    placeholder="Document Title"
                    value={docTitle}
                    onChange={(event) => setDocTitle(event.target.value)}
                  />
                </div>
                <div style={{ width: "30%" }} className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="docIndex"
                    placeholder="Document Index"
                    value={docIndex}
                    onChange={(event) => setDocIndex(event.target.value)}
                  />
                </div>
                <div style={{ width: "30%" }} className="form-group">
                  <select
                    className="form-control"
                    onChange={onCourseSelect}
                    defaultValue="Default"
                  >
                    <option className="placeholder" disabled value="Default">
                      Select Course
                    </option>
                    {courseList.map((course) => (
                      <option value={course.courseId} key={course.courseId}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ width: "30%" }} className="form-group">
                  <input type="file" name="selectedFile" onChange={onChange} />
                </div>
              </div>
            )}
            <div style={{ width: "30%" }}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else {
    return (
      <Alert color="primary">
      <p className="alert-text">
        Upload Success
      </p>
      <Link to={`/course/${courseName}`}>
        View Course
      </Link>
      </Alert>
    );
  }
};

export default withRouter(Form);
