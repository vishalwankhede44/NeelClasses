import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import "firebase/storage";
import { withRouter, Link } from "react-router-dom";
import {
  Alert,
  Button,
  Form as UploadForm,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const storage = firebase.storage();

const FormAddEdit = (props) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [docIndex, setDocIndex] = useState("");

  const [addEdit, setAddEdit] = useState(null);
  const [status, setStatus] = useState("NotDone");

  const [courseName, setCourseName] = useState("");
  const [courseStream, setCourseStream] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseRating, setCourseRating] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseStreamList, setCourseStreamList] = useState([]);
  const [courseBranchList, setCourseBranchList] = useState([]);

  useEffect(() => {
    getCourseStreamList();
  }, []);

  const getCourseStreamList = async () => {
    try {
      await axios.get("http://localhost:5000/admin/course").then((res) => {
        console.log(res.data.CourseStreamList);
        setCourseStreamList(res.data.CourseStreamList);
      });
    } catch (error) {
      console.log(`Get Error ${error}`);
    }
  };
  const getCourseBranchList = async (cs) => {
    try {
      await axios
        .get(`http://localhost:5000/admin/course/${cs}`)
        .then((res) => {
          console.log(res.data.CourseBranchList);
          // setCourseBranchList(res.data.CourseBranchList);
        });
    } catch (error) {
      console.log(`Get Error ${error}`);
    }
  };

  const tempClick = () => {
    console.log({ courseStream });
    getCourseBranchList({ courseStream }.courseStream);
  };
  const onAddEditSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setAddEdit(event.nativeEvent.target[index].value);
  };

  const onStreamSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setCourseStream(event.nativeEvent.target[index].value);
    console.log(courseStream);
  };
  const onBranchSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setCourseBranch(event.nativeEvent.target[index].value);
  };
  const onYearSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setCourseYear(event.nativeEvent.target[index].value);
  };

  const onSubmit = async (event) => {
    // props.history.push(`upload/${videosNotes !== "Notes" ? "video" : "notes"}`);
    // event.preventDefault();
    // const uploadTask = storage
    //   .ref(`${videosNotes !== "Notes" ? "Videos" : "Notes"}/${file.name}`)
    //   .put(file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const uploadPercentage = Math.floor(
    //       (snapshot.bytesTransferred * 100) / snapshot.totalBytes
    //     );
    //     setUploadPercentage(uploadPercentage);
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     storage
    //       .ref(`${videosNotes !== "Notes" ? "Videos" : "Notes"}`)
    //       .child(file.name)
    //       .getDownloadURL()
    //       .then(async (url) => {
    //         if (videosNotes !== "Notes") {
    //           if (url != null && courseInfo != null && videoTitle != null) {
    //             var timestamp1 = new Date();
    //             const VideoInfo = {
    //               videoTitle: videoTitle,
    //               videoUrl: url,
    //               courseInfo: courseInfo,
    //               timestamp: timestamp1.toString(),
    //             };
    //             try {
    //               await axios
    //                 .post("http://localhost:5000/admin/upload/video", VideoInfo)
    //                 .then((res) => {
    //                   console.log(res.data);
    //                   if (res.data === "Done") {
    //                     setStatus(res.data);
    //                   } else {
    //                     setStatus("NotDone");
    //                   }
    //                 });
    //             } catch (error) {
    //               console.log(`Post Error for Video ${error}`);
    //             }
    //           } else {
    //             console.log("Course Info Not Selected");
    //           }
    //         } else {
    //           if (url != null && courseInfo != null && docTitle != null) {
    //             var timestamp2 = new Date();
    //             const DocInfo = {
    //               docTitle: docTitle,
    //               docIndex: docIndex,
    //               docUrl: url,
    //               courseInfo: courseInfo,
    //               timestamp: timestamp2.toString(),
    //             };
    //             try {
    //               await axios
    //                 .post("http://localhost:5000/admin/upload/notes", DocInfo)
    //                 .then((res) => {
    //                   console.log(res.data);
    //                   if (res.data === "Done") {
    //                     setStatus(res.data);
    //                   } else {
    //                     setStatus("NotDone");
    //                   }
    //                 });
    //             } catch (error) {
    //               console.log(`Post Error for Notes ${error}`);
    //             }
    //           }
    //         }
    //       });
    //   }
    // );
  };

  if (status === "NotDone")
    return (
      <div className="container">
        <button name="temp" id="btn" onClick={() => tempClick()}>
          Click Me
        </button>
        <UploadForm className="form-body">
          <FormGroup className="form-body-component">
            <select
              onChange={onAddEditSelect}
              defaultValue="Default"
              className="selector"
            >
              <option className="placeholder" disabled value="Default">
                Add / Edit Course
              </option>
              <option value="Add">Add</option>
              <option value="Edit">Edit</option>
            </select>
          </FormGroup>

          {courseStream}
          {addEdit !== "Edit" ? (
            <div>
              <FormGroup className="form-body-component">
                <Input
                  type="text"
                  className="course-name-field"
                  name="courseName"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(event) => setCourseName(event.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-body-component">
                <select
                  onChange={(event) => onStreamSelect(event)}
                  defaultValue="Default"
                  className="selector"
                >
                  <option className="placeholder" disabled value="Default">
                    Select Stream
                  </option>
                  {courseStreamList.map((course) => (
                    <option
                      value={course.courseStream}
                      key={course.courseStream}
                    >
                      {course.courseStream}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup className="form-body-component">
                <select
                  onChange={onBranchSelect}
                  defaultValue="Default"
                  className="selector"
                >
                  <option className="placeholder" disabled value="Default">
                    Select Branch
                  </option>
                  {courseBranchList.map((course) => (
                    <option value={course.Branch} key={course.Branch}>
                      {course.courseBranch}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup className="form-body-component">
                <select
                  onChange={onYearSelect}
                  defaultValue="Default"
                  className="selector"
                >
                  <option className="placeholder" disabled value="Default">
                    Select Year
                  </option>
                  {courseStream !== "Diploma" ? (
                    <div>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                    </div>
                  ) : (
                    <div>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                    </div>
                  )}
                </select>
              </FormGroup>
              <FormGroup className="form-body-component">
                <Input
                  type="text"
                  className="course-rating-field"
                  name="courseRating"
                  placeholder="Course Rating"
                  value={courseRating}
                  onChange={(event) => setCourseRating(event.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-body-component">
                <Input
                  type="text"
                  className="course-price-field"
                  name="coursePrice"
                  placeholder="Course Price"
                  value={coursePrice}
                  onChange={(event) => setCoursePrice(event.target.value)}
                />
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
              <FormGroup className="form-body-component">
                <Input
                  type="text"
                  className="doc-title"
                  name="docIndex"
                  placeholder="Document Index"
                  value={docIndex}
                  onChange={(event) => setDocIndex(event.target.value)}
                />
              </FormGroup>
              {/* <FormGroup  className="form-body-component">
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
                </FormGroup> */}
            </div>
          )}
          <FormGroup className="form-body-component">
            <Button className="submit-btn" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </FormGroup>
        </UploadForm>
      </div>
    );
  else {
    return (
      <Alert color="primary">
        <p className="alert-text">Upload Success</p>
        <Link to={`/course/${courseName}`}>View Course</Link>
      </Alert>
    );
  }
};

export default withRouter(FormAddEdit);
