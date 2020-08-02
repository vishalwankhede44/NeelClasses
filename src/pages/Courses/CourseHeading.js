import React from "react"
import { browserHistory} from 'react-router'
// import CourseInfo from "./course_info"

import { faStar, faStarHalfAlt, faComment, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CourseFeed from "./course_feed";

class CourseHeading extends React.Component {
    constructor(props) {
        super(props)

        this.renderRating = this.renderRating.bind(this)
        // this.renderPrice = this.renderPrice.bind(this)
        this.videoOpenHandle = this.videoOpenHandle.bind(this)
    }

    renderRating() {
        if (this.props.course.courseRating < 1) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating == 1) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
     
               </div>
            )
        }
        if (this.props.course.courseRating > 1 && this.props.course.courseRating < 2) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating == 2) {
            return (
                <div>
                    <span className="rating2"><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span className="rating2"><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating > 2 && this.props.course.courseRating < 3) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating == 3) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating > 3 && this.props.course.courseRating < 4) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating == 4) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating > 4 && this.props.course.courseRating < 5) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} /></span>
                </div>
            )
        }
        if (this.props.course.courseRating == 5) {
            return (
                <div>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                    <span><FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} /></span>
                </div>
            )
        }
    }



    // renderPrice() {
    //     let str = this.props.course.coursePrice.toString();
    //     return str.slice(0, str.length - 2) + "." + str.slice(str.length - 2)
    // }


    videoOpenHandle() {
        let courseId = Object.values(this.props.videos)[0][0].course_content_id
        this.props.showPlayer(0, courseId)
    }


    render() {
        return (
            <div>
                {this.props.course && 
                    <div>
                        <div className="course-header" >
                        <div className="course-header-inner">
                            <div className="course-info">
                                <div>
                                    <div className="course-header-title">{this.props.course.courseName}</div>
                                    <div className="course-header-description">qwer wer erty tyu yui ghj fghjkl sdfghj.</div>
                                </div>
                                <div>
                                    <div className="course-header-instructor">Isaal Wankide</div>
                                    <div><span className="course-header-rating">{this.renderRating()}</span></div>
                                </div>
                                
                                
                            </div>
                            
                            <div className="course-description">
                                <div>
                                    <button type="submit" className="btn-enroll">Enroll for<br></br>$2499/-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>  
                }
            </div>
        )
    }
}

export default CourseHeading;