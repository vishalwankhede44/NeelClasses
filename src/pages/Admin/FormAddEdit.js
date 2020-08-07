import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import "firebase/storage";
import { withRouter, Link } from "react-router-dom";
import { Alert, Button, Form as UploadForm, FormGroup, Label, Input, FormText  } from "reactstrap";
import AsyncSelect from 'react-select/async'

const storage = firebase.storage();

const FormAddEdit = (props) => {



  const [status, setStatus] = useState("NotDone");
  
  //Form States
  const [courseName, setCourseName] = useState("");
  const [courseStream, setCourseStream] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseRating, setCourseRating] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  //Form States for Select
  const [courseStreamList,setCourseStreamList] = useState([]);
  const [courseBranchList,setCourseBranchList] = useState([]);

  useEffect(() => {
   
  }, []);


const getCourseStreamList =  (inputValue, callback) => {
  if (!inputValue) {
    callback([]);
  } else {
      setTimeout(() => {
        try {
          axios
          .get("http://localhost:5000/admin/course")
          .then((res) => {
          console.log(res.data.CourseStreamList);
          const courseStreamList = [];
          res.data.CourseStreamList.forEach((stream) => {
          courseStreamList.push({ label: `${stream.courseStream}`, value: stream.courseStream });
        });
          callback(courseStreamList);
        });
        } catch (error) {
        console.log(`Get Error ${error}`);
        }
    });
  }
}

const onStreamSelect = (selectedValue) => {
  if (selectedValue) {
    setCourseStream(selectedValue.value);
  }
}

const getCourseBranchList =  (inputValue, callback) => {
  if (!inputValue) {
    callback([]);
  } else {
      setTimeout(() => {
        try {
          axios
          .get(`http://localhost:5000/admin/course/${courseStream}`)
          .then((res) => {
          console.log(res.data.CourseBranchList);
          const courseBranchList = [];
          res.data.CourseBranchList.forEach((branch) => {
          courseBranchList.push({ label: `${branch.courseBranch}`, value: branch.courseBranch });
        });
          callback(courseBranchList);
        });
        } catch (error) {
          console.log(`Get Error ${error}`);
        }
    });
  }
}



  const onBranchSelect = (selectedValue) => {
    if (selectedValue) {
      setCourseBranch(selectedValue.value);
    }
  }



  const getCourseYearList =  (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
        setTimeout(() => {
          try {
            axios
            .get(`http://localhost:5000/admin/course/${courseStream}/${courseBranch}`)
            .then((res) => {
            console.log(res.data.CourseYearList);
            const courseYearList = [];
            res.data.CourseYearList.forEach((year) => {
            courseYearList.push({ label: `${year.courseYear}`, value: year.courseYear });
          });
            callback(courseYearList);
          });
          } catch (error) {
            console.log(`Get Error ${error}`);
          }
      });
    }
  }
  
  
  
    const onYearSelect = (selectedValue) => {
      if (selectedValue) {
        setCourseYear(selectedValue.value);
      }
    }
  const onSubmit = async (event) => {
    event.preventDefault();
    const CourseInfo = {
      courseName :courseName,
      courseStream :courseStream,
      courseBranch :courseBranch,
      courseYear : courseYear,
      courseRating :courseRating,
      coursePrice :coursePrice
    };
    console.log(JSON.stringify(CourseInfo));
    try {
      await axios
      .post(`http://localhost:5000/admin/course`,CourseInfo)
      .then((res) => {
        setStatus(res.data);
      });
      } catch (error) {
        console.log(`Post Error ${error}`);
      }
    };
  if (status === "NotDone")
    return (
        <div className="container">
          <UploadForm className="form-body">
                <FormGroup  className="form-body-component">
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
                  <AsyncSelect
                    loadOptions={getCourseStreamList}
                    placeholder="Select Stream"
                    onChange={(e) => onStreamSelect(e)}
                    defaultOptions={false}
                    className="selector"
                  />
                   <div>{courseStream}</div>
                </FormGroup>
                <FormGroup className="form-body-component">
                <AsyncSelect
                    loadOptions={getCourseBranchList}
                    placeholder="Select Branch"
                    onChange={(e) => onBranchSelect(e)}
                    defaultOptions={false}
                    className="selector"
                  />
                <div>{courseBranch}</div>
                </FormGroup>
                <FormGroup className="form-body-component">
                <AsyncSelect
                    loadOptions={getCourseYearList}
                    placeholder="Select Year"
                    onChange={(e) => onYearSelect(e)}
                    defaultOptions={false}
                    className="selector"
                  />
                <div>{courseYear}</div>
                </FormGroup>
                <FormGroup  className="form-body-component">
                  <Input
                    type="text"
                    className="course-rating-field"
                    name="courseRating"
                    placeholder="Course Rating"
                    value={courseRating}
                    onChange={(event) => setCourseRating(event.target.value)}
                  />
                </FormGroup>
                <FormGroup  className="form-body-component">
                  <Input
                    type="text"
                    className="course-price-field"
                    name="coursePrice"
                    placeholder="Course Price"
                    value={coursePrice}
                    onChange={(event) => setCoursePrice(event.target.value)}
                  />
                </FormGroup>
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
      <Alert color="primary">
      <p className="alert-text">
        Course Added Successfully
      </p>
      <Link to={`/course/${courseName}`}>
        View Course
      </Link>
      </Alert>
    );
  }
};

export default withRouter(FormAddEdit);
