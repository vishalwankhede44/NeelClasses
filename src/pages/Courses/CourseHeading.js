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
        if (this.props.course.rating < 1) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.rating === 1) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating > 1 && this.props.course.rating < 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating === 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating > 2 && this.props.course.rating < 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.rating === 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating > 3 && this.props.course.rating < 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating === 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }

        if (this.props.course.rating > 4 && this.props.course.rating < 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStarHalfAlt} />
                </div>
            )
        }

        if (this.props.course.rating === 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ padding:"3px",color: "#f4c150" }} icon={faStar} />
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
                        <div className="heading_box">
                            <div>
                                <div style={{ fontSize: "36px", lineHeight: "41px", fontFamily: "inherit", paddingBottom:"15px" }}>{this.props.course.courseName}</div>
                                <div style={{ fontSize: "21px", lineHeight: "27px", fontFamily: "inherit", paddingBottom: "10px"}}>{this.props.course.subtitle}</div>
                            <div ><span style={{paddingRight:"32px", fontSize:"15px"}}>Create by {this.props.course.teacher}</span><FontAwesomeIcon style={{ color: "#fff" }} icon={faComment} />{this.props.course.languages}</div>
                            </div>
                            <div className="course-feed-img-box">
                                <div className="img-play-box" onClick={this.videoOpenHandle}> 
                                <img style={{ maxWidth:"335px"}}src={this.props.course.picture} alt="course" />
                                    <div className="play-circle" > <FontAwesomeIcon icon={faPlayCircle} className="play-circle-icon"/></div>
                                </div>
                                {/* <div style={{ textAlign: "center" }}>${this.renderPrice()}</div> */}
                            <button className="back-home-button" onClick={() => browserHistory.push("/")}>Back To Home</button>  
                            </div>
                        </div>
                        {/* <CourseInfo course={this.props.course}/> */}
                    </div>
                }
            </div>
        )
    }
}

export default CourseHeading;