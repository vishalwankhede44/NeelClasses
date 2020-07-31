import React, { Component } from 'react';
import { browserHistory} from 'react-router';
import  {withRouter} from 'react-router-dom';
// import '../../App.css';
class HomeSearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchString: ""
        }
        this.inputFocus = this.inputFocus.bind(this)
        this.inputUnFocus = this.inputUnFocus.bind(this)
        this.getSearchInput = this.getSearchInput.bind(this)
    }
    getSearchInput(e) {
        if (e.key === 'Enter') {
            this.setState({
                searchString: e.target.value
            });
           this.searchClickHandle();
        } else {
            this.setState({
                searchString: e.target.value
            })
        }
    }
    searchClickHandle() {
        this.props.history.push(`/courses/search/${this.state.searchString}`);
    }

    inputFocus() {
        this.setState({
            iconClassName: "search-icon-open"
        })
    }

    inputUnFocus() {
        this.setState({
            iconClassName: "search-icon"
        })
    }

    render() {
        return (
            <div>
                <div className="home-box">
                        <div className="home-content">
                            <h3 className="home-headline">The Premium System <br/>Education</h3>
                            <h6 className="home-subline">Future of Education Technology</h6>
                            <label className="search-label">
                                <input className="search-input" type="text" placeholder="Search for anything"  onFocus={this.inputFocus} onBlur={this.inputUnFocus} onKeyUp={this.getSearchInput}/>
                            </label>
                            <div className="home-button">
                                <button className="loginButton" >Log In</button>
                                <button className="signupButton">Sign Up</button>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}


export default withRouter(HomeSearchPanel);