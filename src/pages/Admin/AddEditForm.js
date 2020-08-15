import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormAddEdit from "./FormAddEdit";
class AddEditForm extends PureComponent {

 constructor(props){
   super(props)
 }
  render() {
    return (
      <div className="upload-container">
        <div className="header">Add Course</div>
              <FormAddEdit course={this.props.course}/>
      </div>
    );
  }
}

export default AddEditForm;
