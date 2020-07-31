import React from "react"
import axios from 'axios';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class VideoContainer extends React.Component {
    render(){
        console.log(this.props);
        if (this.props.video !== "temp") {
                return(
                    <div className="modal-back-video">
                        <div id="video-container">
                            <div className="video-title">
                                <div>{this.props.video.videoTitle}</div>
                                {/* <div onClick={ }></div> */}
                            </div>
                            <video width="100%" height="100%" className="video-player"controls>
                                {/* <source src={this.props.video[videoId].url} /> */}
                                
                                <source src={this.props.video.videoUrl} />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )
            } else {
                return <div>Piyush</div>
            }
    }
}


export default VideoContainer;