import React, { useEffect, useState } from 'react';
import { faBook, faSignOutAlt ,faVideo, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableComponent from './CourseTable';
import 'axios-progress-bar/dist/nprogress.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';
import UploadForm from './UploadForm';
import AddEditForm from "./AddEditForm";


const AdminPanel = (props) => {

    const [loadingForCourses, setLoadingForCourses] = useState(0);
    const [loadingForUpload, setLoadingForUpload] = useState(0);
    const [courseInfo, setCourseInfo] = useState([]);
    const [showCourses, setShowCourses] = useState(false);
    const [uploadVideosNotes, setUploadVideosNotes] = useState(false);
    const [addEditCourse, setAddEditCourse] = useState(false);


    const onCourseClick = () => {
        props.history.push('/admin/courses');
        getDataForCourses();
        setShowCourses(true);
        setUploadVideosNotes(false);
        setAddEditCourse(false)
    }
    const onUploadVideosNotesClick =()=> {
        props.history.push('/admin/upload')
        setUploadVideosNotes(true);
        setShowCourses(false);
        setAddEditCourse(false);
    }
     const onAddEditClick =()=> {
        props.history.push('/admin/course')
        setUploadVideosNotes(false);
        setShowCourses(false);
        setAddEditCourse(true);
    }

    const getDataForCourses = async () => {
        try {
        await axios.get(`http://localhost:5000/admin/courses`,{
            onDownloadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setLoadingForCourses(percentCompleted);
            }
        })
        .then(res => { 
            console.log(res.data.CourseInfoList);   
            setCourseInfo(res.data.CourseInfoList);
        })
        } catch (error) {
            console.log(`Get Error ${error}`)
        }
    } 
 
    return(
        
        <div>
            <div className="admin-panel-container">
                <div className="admin-header">
                    <div className="admin-header-title">Admin Panel</div>
                </div>
                <div className="admin-body">
                    <div className="admin-left-sidebar">
                        <div className="admin-left-sidebar-buttons">
                            <button className="course" onClick={() => onCourseClick()}><span className="admin-icons"><FontAwesomeIcon icon={faBook}  /></span>Course</button>
                            <button className="course" onClick={()=> onAddEditClick()}><span className="admin-icons"><FontAwesomeIcon icon={faFolderPlus} /></span>Add / Edit Course</button>
                            <button className="course" onClick={()=> onUploadVideosNotesClick()}><span className="admin-icons"><FontAwesomeIcon icon={faVideo} /></span>Upload Video / Notes</button>
                            {/* <button className="course"><span className="admin-icons"><FontAwesomeIcon icon={faFilePdf} /></span>Notes</button> */}
                            
                        </div>
                        <div className="separator"></div>
                        <div className="admin-left-sidebar-utility">
                            <div className="admin-left-sidebar-utility-buttons">
                                <button className="logout"><span className="admin-icons"><FontAwesomeIcon icon={faSignOutAlt}  /></span>Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin-right-sidebar">
                        {showCourses &&  loadingForCourses===100
                         ?<div className="admin-right-sidebar-course">
                            <TableComponent courses={courseInfo}/>
                        </div> : loadProgressBar()}
                        {uploadVideosNotes
                         ?<div className="admin-right-sidebar-upload">
                        <UploadForm/>
                        </div> : null}
                        {addEditCourse ?
                        <div className="admin-right-sidebar-add-edit">
                            <AddEditForm />
                        </div>
                        :null
                        }
                    </div>
                </div>
                <div className="admin-footer">
                
                </div>
                
            </div>
        </div>

    );
}

export default withRouter(AdminPanel);