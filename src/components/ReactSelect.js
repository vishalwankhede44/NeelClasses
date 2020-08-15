import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'
import axios from "axios";

class ReactSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        selectedOption: "",
        option :""
    }
  }

fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
        setTimeout(() => {
            try {
                axios
                .get("http://localhost:5000/admin/course")
                .then((res) => {
                  console.log(res.data.CourseStreamList);
                  const courseStreamList = [];
                  res.data.CourseStreamList.forEach((stream) => {
                    courseStreamList.push({ label: `${stream.courseStream}`, value: stream.courseStream });
                    });
                    callback(courseStreamList);
                });
              } catch (error) {
                console.log(`Get Error ${error}`);
              }
        });
    }
}

 onSearchChange = (soption) => {
     console.log(soption);
    if (soption) {

    this.setState({
        option:soption.value
       });
    }
  };
  render() {
      return ( 
      <div>
           <AsyncSelect
                value={this.state.selectedOption}
                loadOptions={this.fetchData}
                placeholder="Select Stream"
                onChange={(e) => {
                    this.onSearchChange(e);
                }}
                defaultOptions={false}
                className="selector"
            />
            <div>
                {this.state.option}
            </div>
      </div>)
  }

}

export default ReactSelect;