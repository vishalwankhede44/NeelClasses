import React from "react"

import { withRouter } from "react-router-dom"

import { faPlus, faMinus, faPlayCircle  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoContainer from "./VideoContainer";

class CourseContentContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: false,
            showVideo:"temp"
        }
        this.showOrHidden = this.showOrHidden.bind(this)
        this.titleClickHandle = this.titleClickHandle.bind(this)
    }

    // componentDidMount() {
    //     this.props.fetchAllVideos(this.props.match.params.courseId, this.props.content.id)
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.content.id !== prevProps.content.id) {
    //         this.props.fetchAllVideos(this.props.match.params.courseId, this.props.content.id)
    //     }
    // }

    showOrHidden() {
        if(this.state.dropdown) {
            return "content-show"
        } else {
            return "content-hidden"
        }
    }
    closeButton (){
this.setState({
    showVideo: "temp"
});
    }

    titleClickHandle() {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }
    showVideoContainer(){
    this.props.showVideo(this.props.content);
    }
    render() {
        if (this.props.content) {
            return (
                    <div onClick={this.titleClickHandle}>
                        <div className="content-box" >
                            {this.state.dropdown ? <h3>{this.props.index}. </h3> :<h3>{this.props.index}. </h3>}
                            <div className="content-title">{this.props.content.videoTitle}</div>
                        </div>
                        <div className={this.showOrHidden()}>
        
                            <div className="content-video-list" onClick={()=> this.showVideoContainer()}>
                                <div>
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                    <span style={{marginLeft:"11px"}}>{this.props.content.videoTitle}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }
        else {
            return null
        }

    }
}

export default withRouter(CourseContentContainer);