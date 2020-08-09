import React, { PureComponent } from 'react';
import FormUpload from "./Form";
class Upload extends PureComponent {
 
  render() {
    return (
      <div className="upload-container">
        <div className="header">Upload Video / Notes</div>
              <FormUpload/>
      </div>
    );
  }
}

export default Upload;
