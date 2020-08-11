import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import "firebase/storage";
import { withRouter, Link } from "react-router-dom";
import { Alert, Button, Form as UploadForm, FormGroup, Label, Input, FormText  } from "reactstrap";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const storage = firebase.storage();

const FormUpload = (props) => {
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
        <div className="container">
          <div className="header">Upload Video / Notes</div>
          <UploadForm className="form-body">
            <FormGroup className="form-body-component">
              <select
                onChange={onVideosNotesSelect}
                defaultValue="Default"
                className="selector"
              >
                <option className="placeholder" disabled value="Default">
                  Select Videos / Notes
                </option>
                <option value="Notes">Notes</option>
                <option value="Videos">Videos</option>
              </select>
            </FormGroup>
            {videosNotes !== "Notes" ? (
              <div className="form-body-component">
                <FormGroup  className="form-body-componentx">
                  <Input
                    type="text"
                    className="video-title-field"
                    name="videoTitle"
                    placeholder="Video Title"
                    value={videoTitle}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-body-component">
                  <select
                    onChange={onCourseSelect}
                    defaultValue="Default"
                    className="selector"
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
                </FormGroup>
                <FormGroup className="form-body-component">
                  <Input className="selected-file-video" type="file" name="selectedFile" onChange={onChange} />
                </FormGroup>
              </div>
            ) : (
              <div>
                <FormGroup className="form-body-component">
                  <Input
                    type="text"
                    className="doc-title"
                    name="docTitle"
                    placeholder="Document Title"
                    value={docTitle}
                    onChange={(event) => setDocTitle(event.target.value)}
                  />
                </FormGroup>
                <FormGroup  className="form-body-component">
                  <Input
                    type="text"
                    className="doc-title"
                    name="docIndex"
                    placeholder="Document Index"
                    value={docIndex}
                    onChange={(event) => setDocIndex(event.target.value)}
                  />
                </FormGroup>
                <FormGroup  className="form-body-component">
                  <select
                    className="selector"
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
                </FormGroup>
                <FormGroup className="form-body-component">
                  <Input className="selected-file-notes" type="file" name="selectedFile" onChange={onChange} />
                </FormGroup>
              </div>
            )}
            <FormGroup className="form-body-component">
              <Button
                className="submit-btn"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </FormGroup>
          </UploadForm>
        </div>
    );
  else {
    return (
      <Alert className="alert">
      <p className="alert-text">
        your file was uploaded successfully...
      </p>
      <Link className="alert-view-course" to={`/course/${courseName}`}>
      <p >
        View Course <span><FontAwesomeIcon icon={faHandPointRight} /></span>
      </p>
      </Link>
      </Alert>
    );
  }
};

export default withRouter(FormUpload);
