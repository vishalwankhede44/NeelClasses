import React, { Component } from 'react';
import { browserHistory} from 'react-router'
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
        this.searchClickHandle = this.searchClickHandle.bind(this)
    }
    getSearchInput(e) {
        if (e.key === 'Enter') {
            this.searchClickHandle();
        } else {
            this.setState({
                searchString: e.target.value
            })
        }
    }

    searchClickHandle() {
        browserHistory.push(`/courses/search/${this.state.searchString}`)
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
                                <button className="loginButton">Log In</button>
                                <button className="signupButton">Sign Up</button>
                            </div>
                        </div>
                </div>
                {/* <div  className="home-search-footer">
                    <div className="home-footer-section">
                        <b className="home-footer-section-header">100,000 online courses</b>
                        <div className="home-footer-section-text">
                            Explore a variety of fresh topics
                         </div>
                    </div>
                    <div className="home-footer-section">
                        <b className="home-footer-section-header">Expert instruction</b>
                        <div className="home-footer-section-text">
                            Find the right instructor for you
                        </div>
                    </div>  
                    <div className="home-footer-section">
                        <b className="home-footer-section-header">Lifetime access</b>
                        <div className="home-footer-section-text">
                            Learn on your schedule
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}


export default HomeSearchPanel;