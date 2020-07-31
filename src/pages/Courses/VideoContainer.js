import React from "react"
import axios from 'axios';
import ReactPlayer from 'react-player';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class VideoContainer extends React.Component {

    closeVideoContainer(){
        this.props.closeVideo();
    }
    render(){
        if (this.props.video) {
                return(
                    <div className="modal-back-video">
                        <div id="video-container">
                            <div className="video-title">
                                <div>{this.props.video.videoTitle}</div>
                            </div>
                            <ReactPlayer 
                            /*playIcon={<button>Play</button>} 
                            light="http://placekitten.com/200/300"*/ 
                            onContextMenu={e => e.preventDefault()} 
                            config={{ file: { attributes: { controlsList: 'nodownload',disablepictureinpicture: 'true' } } } } 
                            controls={true} 
                            url={this.props.video.videoUrl}
                            className="video-player"
                            />
                            <div className="video-close">
                                <button className="close-button" onClick={() => this.closeVideoContainer()}>close</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <div>Piyush</div>
            }
    }
}


export default VideoContainer;