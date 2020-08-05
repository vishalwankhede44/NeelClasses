import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Form from "./Form";
class Upload extends PureComponent {
 
  render() {
    return (
      <div className="upload-container">
        <div className="header">Upload Video / Notes</div>
              <Form/>
      </div>
    );
  }
}

export default Upload;
