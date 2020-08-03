import React, { useEffect, useState } from 'react';
import { faBook, faSignOutAlt ,faVideo, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableComponent from './CourseTable';
import 'axios-progress-bar/dist/nprogress.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';

const AdminPanel = (props) => {

    const [loading, setLoading] = useState(0);
    const [courseInfo, setCourseInfo] = useState([]);
    const [showCourses, setShowCourses] = useState(false);


    const onCourseClick = () => {
        props.history.push('/admin/courses');
        getDataFromFirebase();
        setShowCourses(true);
    }

    const getDataFromFirebase = async () => {
        try {
        await axios.get(`http://localhost:5000/admin/courses`,{
            onDownloadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setLoading(percentCompleted);
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
                
                </div>
                <div className="admin-body">
                    <div className="admin-left-sidebar">
                        <div className="admin-left-sidebar-buttons">
                            <button className="course" onClick={() => onCourseClick()}><span className="admin-icons"><FontAwesomeIcon icon={faBook}  /></span>Course</button>
                            <button className="course"><span className="admin-icons"><FontAwesomeIcon icon={faFolderPlus} /></span>Add / Edit Course</button>
                            <button className="course"><span className="admin-icons"><FontAwesomeIcon icon={faVideo} /></span>Upload Video / Notes</button>
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
                        {showCourses &&  loading===100
                         ?<div className="admin-right-sidebar-course">
                            <TableComponent courses={courseInfo}/>
                        </div> :loadProgressBar()}
                    </div>
                </div>
                <div className="admin-footer">
                
                </div>
                
            </div>
        </div>

    );
}

export default withRouter(AdminPanel);