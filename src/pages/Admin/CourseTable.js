import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

const TableComponent = (props) => {
  const [selCourse, setSelCourse] = useState({});
  const [status, setStatus] = useState("NOTDELETED");
  useEffect(() => {});

  const deleteCourse = async (course) => {
    var s = window.confirm("Are you really want to delete this course");
    if (!s) return;
    course.courseStatus = "DELETE";
    try {
      await axios
        .put(`http://localhost:5000/admin/editcourse`, course)
        .then((res) => {
          setStatus(res.data);
        });
    } catch (error) {
      console.log(`Post Error ${error}`);
    }
  };

  return (
    <div className="table-component">
      <table className="table-body">
        <caption>All Courses</caption>
        <thead>
          <tr>
            <th scope="col">Sr. no</th>
            <th scope="col">Course Name</th>
            <th scope="col">Stream</th>
            <th scope="col">Branch</th>
            <th scope="col">Year</th>
            <th scope="col">Rating</th>
            <th scope="col">Course Content</th>
            <th scope="col">Price</th>
            <th scope="col">Edit Course</th>
            <th scope="col">Delete Course</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{course.courseName}</td>
                <td>{course.courseStream}</td>
                <td>{course.courseBranch}</td>
                <td>{course.courseYear}</td>
                <td>{course.courseRating}</td>
                <td>
                  <Link to={`/course/${course.courseName}`}>
                    Course Videos / Notes
                  </Link>
                </td>
                <td>{course.coursePrice}</td>
                <td>
                  <Link
                    onClick={() => {
                      props.setAddEditMethod(true);
                      props.setShowCoursesMethod(false);
                      props.setUploadVideosNotesMethod(false);
                      props.setCourseMethod(course);
                    }}
                  >
                    Edit Course
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteCourse(course)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(TableComponent);
