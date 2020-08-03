import React, { Component } from 'react';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {withRouter} from 'react-router-dom';

class HomeSearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchString: "",
            iconClassName: "search-icon",
        }
        this.inputFocus = this.inputFocus.bind(this)
        this.inputUnFocus = this.inputUnFocus.bind(this)
        this.getSearchInput = this.getSearchInput.bind(this)
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
                            <p className="home-headline">The Premium System Education</p>
                            <p className="home-subline">Future of Education Technology</p>
                            <div class="wrap">
                                <div class="search">
                                    <input type="text" class="searchTerm" placeholder="Search for anything" onFocus={this.inputFocus} onBlur={this.inputUnFocus} onKeyUp={this.getSearchInput}></input>
                                    <button type="submit" class="searchButton">
                                        <FontAwesomeIcon icon={faSearch} className={this.state.iconClassName} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="home-button-new">
                                <button class="btn-in">Log In</button>
                                <button class="btn-up">Sign Up</button>
                                
                            </div>
                        </div>
                        </div>
                </div>
            
        )
    }
}


export default withRouter(HomeSearchPanel);