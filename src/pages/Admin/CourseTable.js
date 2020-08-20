import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import {
  faEdit,
  faTrash,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        .put(`https://neelclasses.herokuapp.com/admin/editcourse`, course)
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
            <th scope="col">Field</th>
            <th scope="col">Branch</th>
            <th scope="col">Year</th>
            <th scope="col">Instructor</th>
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
                <td>{course.courseField}</td>
                <td>{course.courseBranch}</td>
                <td>{course.courseYear}</td>
                <td>{course.courseInstructor}</td>
                <td>{course.courseRating}</td>
                <td>
                  <button className="link-view-contents">
                    <span>
                      <FontAwesomeIcon icon={faHandPointRight} />
                    </span>
                    <Link to={`/course/${course.courseName}`}>
                      View Contents
                    </Link>
                  </button>
                </td>
                <td>{course.coursePrice}</td>
                <td>
                  <button
                    className="btn-edit-course"
                    onClick={() => {
                      props.setAddEditMethod(true);
                      props.setShowCoursesMethod(false);
                      props.setUploadVideosNotesMethod(false);
                      props.setCourseMethod(course);
                      props.setButtonClick();
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>{" "}
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn-delete-course"
                    onClick={() => deleteCourse(course)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>{" "}
                    Delete
                  </button>
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
