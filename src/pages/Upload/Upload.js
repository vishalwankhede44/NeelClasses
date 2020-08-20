import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
class Upload extends PureComponent {
  render() {
    return (
      <div className="upload-container">
        <div className="ts very narrow container">
          <br />
          <div className="ts card">
            <div className="content">
              <div className="header">Upload File</div>
              <div className="description">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
