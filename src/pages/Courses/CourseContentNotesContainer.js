import React from "react"

import { withRouter } from "react-router-dom"

import { faPlus, faMinus, faPlayCircle , faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class CourseContentNotesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: false,
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

    titleClickHandle() {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }
    showNotesContainer(){
    this.props.showNotes(this.props.content);
    }
    render() {
        if (this.props.content) {
            return (
                    <div onClick={this.titleClickHandle}>
                        <div className="content-box" >
                            <span className="Plus">{this.state.dropdown ? <FontAwesomeIcon icon={faMinus} className="plus-minus" /> : <FontAwesomeIcon className="plus-minus" icon={faPlus} />}</span>
                            <div className="content-title">{this.props.content.docIndex}    {this.props.content.docTitle}</div>
                        </div>
                        <div className={this.showOrHidden()}>
                            <div className="content-video-list" onClick={()=> this.showNotesContainer()}>
                                <div>
                                    <span className="Play"><FontAwesomeIcon icon={faPlayCircle} /></span>
                                    <span className="content-video-title" style={{marginLeft:"11px"}}>{this.props.content.docTitle}</span>
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

export default withRouter(CourseContentNotesContainer);