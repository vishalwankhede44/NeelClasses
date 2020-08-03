import React, { useState } from "react";
import { browserHistory } from "react-router";
// import CourseInfo from "./course_info"
import axios from "axios";

import {
  faStar,
  faStarHalfAlt,
  faComment,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";

// import CourseFeed from "./course_feed";

const CourseHeading = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies([
    "uid",
    "name",
    "mobile",
  ]);

  function enroll() {
    console.log("I got clicked");

    const uid = { cookie }.cookie.uid;
    const courseId = props.course.courseId;
    const Info = {
      uid: uid,
      courseId: courseId,
    };

    console.log(Info);
    axios
      .post("http://localhost:5000/enrollCourse", Info)
      .then((res) => {
        console.log(res.data);
        if (res.data == "Already") alert("Course already purchased");
        else alert("Course purchased successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function renderRating() {
    if (props.course.courseRating < 1) {
      return (
        <div>
          <span>
            <FontAwesomeIcon
              style={{ color: "#f4c150" }}
              icon={faStarHalfAlt}
            />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating == 1) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating > 1 && props.course.courseRating < 2) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon
              style={{ color: "#f4c150" }}
              icon={faStarHalfAlt}
            />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating == 2) {
      return (
        <div>
          <span className="rating2">
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span className="rating2">
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating > 2 && props.course.courseRating < 3) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon
              style={{ color: "#f4c150" }}
              icon={faStarHalfAlt}
            />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating == 3) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating > 3 && props.course.courseRating < 4) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon
              style={{ color: "#f4c150" }}
              icon={faStarHalfAlt}
            />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating == 4) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
          </span>
        </div>
      );
    }
    if (props.course.courseRating > 4 && props.course.courseRating < 5) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon
              style={{ color: "#f4c150" }}
              icon={faStarHalfAlt}
            />
          </span>
        </div>
      );
    }
    if (props.course.courseRating == 5) {
      return (
        <div>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
          <span>
            <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
          </span>
        </div>
      );
    }
  }

  // renderPrice() {
  //     let str = props.course.coursePrice.toString();
  //     return str.slice(0, str.length - 2) + "." + str.slice(str.length - 2)
  // }

  function videoOpenHandle() {
    let courseId = Object.values(props.videos)[0][0].course_content_id;
    props.showPlayer(0, courseId);
  }

  return (
    <div>
      {props.course && (
        <div>
          <div className="course-header">
            <div className="course-header-inner">
              <div className="course-info">
                <div>
                  <div className="course-header-title">
                    {props.course.courseName}
                  </div>
                  <div className="course-header-description">
                    qwer wer erty tyu yui ghj fghjkl sdfghj.
                  </div>
                </div>
                <div>
                  <div className="course-header-instructor">Isaal Wankide</div>
                  <div>
                    <span className="course-header-rating">
                      {renderRating()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="course-description">
                <div>
                  <button
                    type="submit"
                    className="btn-enroll"
                    onClick={() => enroll()}
                  >
                    Enroll for<br></br>$2499/-
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseHeading;
