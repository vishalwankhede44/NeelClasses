import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormAddEdit from "./FormAddEdit";
class AddEditForm extends PureComponent {
 
  render() {
    return (
      <div className="upload-container">
        <div className="header">Add / Edit Course</div>
              <FormAddEdit/>
      </div>
    );
  }
}

export default AddEditForm;
