import React from "react"
import CourseContentContainer from './CourseContentContainer'

class CourseContent extends React.Component {
     render(){
        if (this.props.course.courseVideos && this.props.course.courseNotes) {
            return(
                <div>
                    <div className="title-course">Course Videos</div>
                    <div className="course-contents-index-box">
                    {
                    this.props.course.courseVideos.map((video, index) => (
                        <CourseContentContainer content={video} key={index} showVideo={this.props.showVideoMethod} course={this.props.course} videoInfo={this.props.video} />
                    ))
                    }
                    </div>
                    <div className="title-course">Course Notes</div>
                    <div className="course-contents-index-box">
                    {
                    this.props.course.courseNotes.map((video, index) => (
                        <CourseContentContainer content={video} key={index} showVideo={this.props.showVideoMethod} course={this.props.course} videoInfo={this.props.video} />
                    ))
                    }
                    </div>
                </div>
            ) 
        } else {
            return null
        }
        
    }
}

export default CourseContent;