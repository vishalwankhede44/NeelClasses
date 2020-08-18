import React, { useState, useEffect, useLayoutEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";
import {
  faStar,
  faStarHalfAlt,
  faComment,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";

const CourseHeading = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies([
    "uid",
    "name",
    "mobile",
  ]);
  const [loggedIn, setLogin] = useState(false);

  useLayoutEffect(() => {
    if (props.course.courseId != undefined) {
      checkAccess();
    }
    checkLogin();
  });

  function checkLogin() {
    if ({ cookie }.cookie.name == undefined) {
      console.log("Log in first");
      setLogin(false);
      return false;
    } else {
      console.log("Already logged in");
      if ({ cookie }.cookie.role == "Admin") {
        props.accessMethod(true);
      }
      // props.history.push("/");
      setLogin(true);
      return true;
    }
  }
  function checkAccess() {
    console.log(props.course.courseId);
    const uid = { cookie }.cookie.uid;

    const courseId = props.course.courseId;
    if (courseId == undefined) return null;
    const Info = {
      uid: uid,
      courseId: courseId,
    };
    axios
      .post("http://localhost:5000/checkAccess", Info)
      .then((res) => {
        console.log(res.data);
        if (res.data == "Yes") props.accessMethod(true);
        else props.accessMethod(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function enroll() {
    axios.get("http://localhost:5000/payment").then((res) => {
      {
        document.getElementById("cd").innerHTML = res.data;
      }
    
    });
    // const uid = { cookie }.cookie.uid;
    // if (uid == undefined) props.history.push("/login");
    // else {
    //   const courseId = props.course.courseId;
    //   const Info = {
    //     uid: uid,
    //     courseId: courseId,
    //   };

    //   console.log(Info);
    //   axios
    //     .post("http://localhost:5000/enrollCourse", Info)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data == "Already") alert("Course already purchased");
    //       else alert("Course purchased successfully");
    //       checkAccess();
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
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
                {props.access ? null : (
                  <div>
                    <button
                      type="submit"
                      className="btn-enroll"
                      onClick={() => enroll()}
                    >
                      Enroll for<br></br>${props.course.coursePrice} /-
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(CourseHeading);
