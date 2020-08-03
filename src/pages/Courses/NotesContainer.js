import React from "react"
import ReactPlayer from 'react-player';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class NotesContainer extends React.Component {

    closeNotesContainer(){
        this.props.closeNotes();
    }
    render(){
        if (this.props.notes) {
                return(
                    <div className="modal-back-notes">
                        
                        <div id="notes-container" style={{boxShadow:"none"}}>
                        <iframe
                        className="notes-viewer"
                        title="file"
                        src={`${this.props.notes.docUrl}#toolbar=0`}
                        />
                        </div>
                        <div className="video-close">
                                <span className="close-button" onClick={() => this.closeNotesContainer()}><FontAwesomeIcon icon={faTimes} /></span>{/*<button className="close-button" onClick={() => this.closeVideoContainer()}>close</button> */}
                        </div>

                        <div className="right-click"></div>
                    </div>
                )
            } else {
                return <div>Piyush</div>
            }
    }
}


export default NotesContainer;