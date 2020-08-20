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
import AsyncSelect from "react-select/async";

const FormAddEdit = (props) => {
  const [status, setStatus] = useState("NotDone");

  //Form States
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseStream, setCourseStream] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseRating, setCourseRating] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseField, setCourseField] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [addForm, setAddForm] = useState(true);

  useEffect(() => {
    if (props.course !== undefined) {
      setCourseName(props.course.courseName);
      setCourseStream(props.course.courseStream);
      setCourseBranch(props.course.courseBranch);
      setCourseYear(props.course.courseYear);
      setCourseRating(props.course.courseRating);
      setCoursePrice(props.course.coursePrice);
      setCourseId(props.course.courseId);
      setCourseField(props.course.courseField);
      setCourseDescription(props.course.courseDescription);
      setCourseInstructor(props.course.courseInstructor);
      setAddForm(false);
    } else {
      console.log(props.course);
      setCourseName("");
      setCourseStream("");
      setCourseBranch("");
      setCourseYear("");
      setCourseRating("");
      setCoursePrice("");
      setCourseId("");
      setCourseField("");
      setCourseDescription("");
      setCourseInstructor("");
      setAddForm(true);
    }
  }, []);
  const getCourseStreamList = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        try {
          axios
            .get("https://neelclasses.herokuapp.com/admin/course")
            .then((res) => {
              console.log(res.data.CourseStreamList);
              const courseStreamList = [];
              res.data.CourseStreamList.forEach((stream) => {
                courseStreamList.push({
                  label: `${stream.courseStream}`,
                  value: stream.courseStream,
                });
              });
              callback(courseStreamList);
            });
        } catch (error) {
          console.log(`Get Error ${error}`);
        }
      });
    }
  };

  const onStreamSelect = (selectedValue) => {
    if (selectedValue) {
      setCourseStream(selectedValue.value);
    }
  };

  const getCourseFieldList = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        try {
          axios
            .get(
              `https://neelclasses.herokuapp.com/admin/course/${courseStream}`
            )
            .then((res) => {
              console.log(res.data.CourseFieldList);
              const courseFieldList = [];
              res.data.CourseFieldList.forEach((field) => {
                courseFieldList.push({
                  label: `${field.courseField}`,
                  value: field.courseField,
                });
              });
              callback(courseFieldList);
            });
        } catch (error) {
          console.log(`Get Error ${error}`);
        }
      });
    }
  };

  const onFieldSelect = (selectedValue) => {
    if (selectedValue) {
      setCourseField(selectedValue.value);
    }
  };

  const getCourseBranchList = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        try {
          axios
            .get(
              `https://neelclasses.herokuapp.com/admin/course/${courseStream}/${courseField}`
            )
            .then((res) => {
              console.log(res.data.CourseBranchList);
              const courseBranchList = [];
              res.data.CourseBranchList.forEach((branch) => {
                courseBranchList.push({
                  label: `${branch.courseBranch}`,
                  value: branch.courseBranch,
                });
              });
              callback(courseBranchList);
            });
        } catch (error) {
          console.log(`Get Error ${error}`);
        }
      });
    }
  };

  const onBranchSelect = (selectedValue) => {
    if (selectedValue) {
      setCourseBranch(selectedValue.value);
    }
  };

  const getCourseYearList = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        try {
          axios
            .get(
              `https://neelclasses.herokuapp.com/admin/course/${courseStream}/${courseField}/${courseBranch}`
            )
            .then((res) => {
              console.log(res.data.CourseYearList);
              const courseYearList = [];
              res.data.CourseYearList.forEach((year) => {
                courseYearList.push({
                  label: `${year.courseYear}`,
                  value: year.courseYear,
                });
              });
              callback(courseYearList);
            });
        } catch (error) {
          console.log(`Get Error ${error}`);
        }
      });
    }
  };


  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      borderColor: "#fff",
      height: "61px",
      "&:hover": {
        border: "0px solid black",
        borderColor: "#fff",
        cursor: "pointer",
      },
    }),
  };

  const onYearSelect = (selectedValue) => {
    if (selectedValue) {
      setCourseYear(selectedValue.value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const CourseInfo = {
      courseName: courseName,
      courseStream: courseStream,
      courseField: courseField,
      courseBranch: courseBranch,
      courseYear: courseYear,
      courseRating: courseRating,
      coursePrice: coursePrice,
      courseDescription:courseDescription,
      courseInstructor:courseInstructor
    };
    if (addForm) {
      try {
        await axios
          .post(`https://neelclasses.herokuapp.com/admin/addcourse`, CourseInfo)
          .then((res) => {
            setStatus(res.data);
          });
      } catch (error) {
        console.log(`Post Error ${error}`);
      }
    } else {
      CourseInfo.courseId = courseId;
      try {
        await axios
          .put(`https://neelclasses.herokuapp.com/admin/editcourse`, CourseInfo)
          .then((res) => {
            setStatus(res.data);
          });
      } catch (error) {
        console.log(`Post Error ${error}`);
      }
    }
  };
  if (status === "NotDone")
    return (
      <div className="container">
        <div className="header">Add Course</div>
        <UploadForm className="form-body">
          <FormGroup className="form-body-component">
            <Input
              type="text"
              className="course-name-field"
              name="courseName"
              placeholder="Course Name"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              id="courseName"
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <AsyncSelect
              loadOptions={getCourseStreamList}
              placeholder="Select Stream"
              onChange={(e) => onStreamSelect(e)}
              defaultOptions={false}
              className="selector"
              styles={customStyles2}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <AsyncSelect
              loadOptions={getCourseFieldList}
              placeholder="Select Field"
              onChange={(e) => onFieldSelect(e)}
              defaultOptions={false}
              className="selector"
              styles={customStyles2}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <AsyncSelect
              loadOptions={getCourseBranchList}
              placeholder="Select Branch"
              onChange={(e) => onBranchSelect(e)}
              defaultOptions={false}
              className="selector"
              styles={customStyles2}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <AsyncSelect
              loadOptions={getCourseYearList}
              placeholder="Select Year"
              onChange={(e) => onYearSelect(e)}
              defaultOptions={false}
              className="selector"
              styles={customStyles2}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <Input
              type="text"
              className="course-rating-field"
              name="courseDescription"
              placeholder="Course Description"
              value={courseDescription}
              onChange={(event) => setCourseDescription(event.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <Input
              type="text"
              className="course-rating-field"
              name="courseInstructor"
              placeholder="Course Instructor"
              value={courseInstructor}
              onChange={(event) => setCourseInstructor(event.target.value)}
            />
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
        <p className="alert-text">Course Added Successfully</p>
        <Link to={`/course/${courseName}`}>View Course</Link>
      </Alert>
    );
  }
};

export default withRouter(FormAddEdit);
