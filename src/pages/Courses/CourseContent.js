import React from "react"
import CourseContentContainer from './CourseContentContainer'

class CourseContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        if (this.props.course.courseVideos) {
            const contentsDisplay = this.props.course.courseVideos.map((video, index) => (
                <CourseContentContainer content={video} key={index} index={index+1} course={this.props.course}/>
            ))
            return(
                <div>
                    <div className="title-course">Course content</div>
                    <div className="course-contents-index-box">{contentsDisplay}</div>
                </div>
            ) 
        } else {
            return null
        }
        
    }
}

export default CourseContent;