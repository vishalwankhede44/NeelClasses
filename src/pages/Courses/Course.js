import React from "react"
import axios from 'axios';
import "firebase/firestore";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
import CourseHeading from "./CourseHeading";
import VideoContainer from "./VideoContainer.js";
import CourseContent from "./CourseContent";
import NotesContainer from "./NotesContainer";

class Course extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            loading:0,
            courseInfo : {},
            showVideo :false,
            videoInfo :null,
            showNotes:false,
            notesInfo:null
        }
        this.showVideoContainer = this.showVideoContainer.bind(this)
        this.hideVideoContainer = this.hideVideoContainer.bind(this)
        this.showNotesContainer = this.showNotesContainer.bind(this)
        this.hideNotesContainer = this.hideNotesContainer.bind(this)
    }
    componentDidMount() {
        this.getDataFromFirebase();
    }

    showVideoContainer(video) {
        this.setState({
            showVideo:true,
            videoInfo:video,
        })
    }
    hideVideoContainer(){
        this.setState({
            showVideo:false,
        })
    }
    showNotesContainer(notes) {
        this.setState({
            showNotes:true,
            notesInfo:notes,
        })
    }
    hideNotesContainer(){
        this.setState({
            showNotes:false,
        })
    }
    getDataFromFirebase = async () => {
        try {
        await axios.get(`http://localhost:5000/course/${this.props.match.params.courseId}`,{
            onDownloadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                this.setState({
                    loading:percentCompleted
                });
            }
        })
        .then(res => { 
            console.log(res.data.CourseInfo);
            this.setState({
                courseInfo :res.data.CourseInfo
            });
        })
        } catch (error) {
            console.log(`Get Error ${error}`)
        }
    }      
    render() {
        if(this.state.courseInfo !== null && this.state.loading === 100)
        {
            return(
                <div className="course-detail">
                    <CourseHeading course={this.state.courseInfo}/> 
                    <div className="title-course">Course Contents</div>
                    <CourseContent course={this.state.courseInfo} showVideoMethod={this.showVideoContainer} showNotesMethod={this.showNotesContainer}/>
                    {
                        this.state.showVideo ? <VideoContainer video={this.state.videoInfo} closeVideo={this.hideVideoContainer}  /> : null
                    }
                    {
                        this.state.showNotes ? <NotesContainer notes={this.state.notesInfo} closeNotes={this.hideNotesContainer}  /> : null
                    }
                </div>
            )
        }
        else {
        return <div>{loadProgressBar()}</div>
        }
    }
}
export default Course;