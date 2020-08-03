import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";

class Form extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    progress: PropTypes.number,
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };
  static defaultProps = {
    message: "",
    progress: 0,
    submitting: false,
    onSubmit: () => {},
    onCancel: () => {}
  };
  handleCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };
  handleFormSubmit = () => {
    const file = this.fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);
    this.props.onSubmit(formData);
  };
  validateForm = values => {
    const errors = {};
    if (!values.file) {
      errors.file = "No file selected.";
    }
    return errors;
  };
  render() {
    const { message, progress, submitting } = this.props;
    return (
      <FinalForm
        onSubmit={this.handleFormSubmit}
        validate={this.validateForm}
        render={props => (
          <form className="ts form" onSubmit={props.handleSubmit}>
            <Field name="file">
              {({ input, meta: { error, touched } }) => (
                <div className={`field ${error && touched ? "error" : ""}`}>
                  <input
                    ref={fileInput => (this.fileInput = fileInput)}
                    key="fileInput"
                    type="file"
                    {...input}
                  />
                </div>
              )}
            </Field>
            <div className="ts relaxed separated buttons">
              {!submitting && (
                <button
                  id="send"
                  type="submit"
                  className={`ts primary ${submitting ? "loading" : ""} button`}
                  disabled={submitting}
                >
                  Upload
                </button>
              )}
              {!submitting && (
                <button
                  type="button"
                  className={`ts ${submitting ? "loading" : ""} button`}
                  disabled={submitting}
                  onClick={e => {
                    props.form.reset();
                    this.handleCancel(e);
                  }}
                >
                  Reset
                </button>
              )}
              {submitting && (
                <button className={`ts button`} onClick={this.handleCancel}>
                  Cancel
                </button>
              )}
            </div>
            {(submitting || message) && <hr />}
            {submitting && (
              <div className="ts tiny primary progress">
                <div className="bar" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
            {message}
          </form>
        )}
      />
    );
  }
}

export default Form;
