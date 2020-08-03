import React from "react"
import CourseContentVideoContainer from './CourseContentVideoContainer'
import CourseContentNotesContainer from './CourseContentNotesContainer'

class CourseContent extends React.Component {
     render(){
        if (this.props.course.courseVideos && this.props.course.courseNotes) {
            return(
                <div>
                    <div className="title-course">Course Videos</div>
                    <div className="course-contents-index-box">
                    {
                    this.props.course.courseVideos.map((video, index) => (
                        <CourseContentVideoContainer content={video} key={index} showVideo={this.props.showVideoMethod} />
                    ))
                    }
                    </div>
                    <div className="title-course">Course Notes</div>
                    <div className="course-contents-index-box">
                    {
                    this.props.course.courseNotes.map((notes, index) => (
                        <CourseContentNotesContainer content={notes} key={index} showNotes={this.props.showNotesMethod} />
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