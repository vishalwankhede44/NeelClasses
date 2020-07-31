import React from "react"
import firebase from '../../firebase';
import axios from 'axios';
import "firebase/firestore";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
import CourseHeading from "./CourseHeading";
import VideoContainer from "./VideoContainer.js";
import CourseContent from "./CourseContent";

class Course extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            loading:0,
            courseInfo : {},
            showVideo :false
        }
    }
    componentDidMount() {
        this.getDataFromFirebase();
    }

    getDataFromFirebase = async () => {
        try {
        await axios.get(`http://localhost:5000/courses/${this.props.match.params.courseId}`,{
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
                <div>
                    <CourseHeading course={this.state.courseInfo}/> 
                    <CourseContent course={this.state.courseInfo}/>
                </div>
            )
        }
        else {
        return <div>{loadProgressBar()}</div>
        }
    }
}
export default Course;