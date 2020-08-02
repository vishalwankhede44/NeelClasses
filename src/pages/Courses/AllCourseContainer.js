import React from "react"
import { Link } from 'react-router-dom';

import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class AllCoursesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            learnBox: "search-learn-box"
        }
        this.renderPrice = this.renderPrice.bind(this)
        this.renderRating = this.renderRating.bind(this)
        this.openClassName = this.openClassName.bind(this)
        this.closeClassName = this.closeClassName.bind(this)
    }

    openClassName() {
        this.setState({
            learnBox: "search-learn-box-open"
        })
    }

    closeClassName() {
        this.setState({
            learnBox: "search-learn-box"
        })
    }

    renderRating() {
        if (this.props.course.courseRating < 1) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating == 1) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating > 1 && this.props.course.courseRating < 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating == 2) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating > 2 && this.props.course.courseRating < 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating == 3) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating > 3 && this.props.course.courseRating < 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating == 4) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "dedfe0" }} icon={faStar} />
                </div>
            )
        }
        if (this.props.course.courseRating > 4 && this.props.course.courseRating < 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStarHalfAlt} />
                </div>
            )
        }
        if (this.props.course.courseRating == 5) {
            return (
                <div>
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                    <FontAwesomeIcon style={{ color: "#f4c150" }} icon={faStar} />
                </div>
            )
        }
    }

    renderPrice() {
        let str = this.props.course.coursePrice.toString();
        return str.slice(0, str.length - 2) + "." + str.slice(str.length - 2)
    }

    render() {
        return(

            <div className="search-container3">
                <Link to={`/course/${this.props.course.courseName}`} className="search-feed">
                    <div className="card">
                        <div className="img">
                        <img
                            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201811/online-3412473_1920_1.jpeg?tz.RfsTe_UTLHiDqxmpG7PY_nTIBjwF7&size=770:433"
                            alt="course"
                            className="search-img"
                        />
                        </div>
                        <div className="courseDescription">
                        <div className="courseName">
                            <div className="search-box-title">
                                {this.props.course.courseName}
                            </div>
                            <div className="course-description">
                                <p className="course-description-text">qwert qwert qwer qwer wer wert qwert qwert wer wert wert.</p>
                            </div>
                        </div>
                        <div className="rating">
                            <div>
                            <span className="search-rating-count">
                                {this.renderRating()}
                            </span>
                            </div>
                            <div className="search-rating-span">${this.renderPrice()}</div>
                        </div>
                        </div>
                    </div>
                </Link>
        
           </div>
        )
    }
}

export default AllCoursesContainer;