import React from 'react';

const TableComponent = (props) => {
        
    return(
        <div className="table-component">
            <table className="table-body">
                <caption>Statement Summary</caption>
                <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">Course Title</th>
                        <th scope="col">Course Price</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.props.courses.map((courses) => <td>{courses.courseName}</td>)}
                    </tr>

                </tbody>
                <tr>
                    {/* {dataColumns.map(function(column) {
                    return <td>{row[column]}</td>; })} */}
                </tr>
            </table>
        </div>
    );
}



export default TableComponent;
  
  // Example Data
 