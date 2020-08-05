import React, { useEffect } from 'react';
import {withRouter,Link} from 'react-router-dom';

const TableComponent = (props) => {

    useEffect(() => {
    
    })

    return(
        <div className="table-component">
            <table className="table-body">

                <caption>All Courses</caption>
                <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">Stream</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Year</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Videos</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                {props.courses.map((course) => {
                    return (
                        <tr>
                            <td>{course.courseName}</td>
                            <td>{course.courseStream}</td>
                            <td>{course.branch}</td>
                            <td>{course.courseYear}</td>
                            <td>{course.courseRating}</td>
                            <td><Link to={`/course/${course.courseName}`}>View Course Videos</Link></td>
                            <td><Link to={`/course/${course.courseName}`}>View Course Notes</Link></td>
                            <td>{course.coursePrice}</td>
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
}



export default withRouter(TableComponent);
  
  // Example Data
 