import React, { useState,useEffect} from 'react';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {withRouter,Link} from 'react-router-dom';
import { useCookies } from "react-cookie";



const HomeSearchPanel = (props) => {

    const [searchString,setSearchString]= useState('');
    const [cookie, setCookie] = useCookies([
        "uid",
        "name",
        "mobile",
        "role",
      ]);
      const [loggedIn, setLogin] = useState(false);

    
    useEffect(() => {
        checkLogin();
        }, []);

        function checkLogin() {
        if ({ cookie }.cookie.name == undefined) {
            console.log("Log in first");
            setLogin(false);
            return false;
        } else {
            console.log("Already logged in");
            console.log({ cookie }.cookie.role);
            // props.history.push("/");
            setLogin(true);
            return true;
        }
    }
    const getSearchInput = (e) => {
        if (e.key === 'Enter') {
            searchClickHandle();
        } else {
            setSearchString(e.target.value);
        }
    }
    const searchClickHandle = () => {
        props.history.push(`/courses/search/${searchString}`);
    }

    return(
        <div>
            <div className="home-box">
            <div className="home-content">
            <p className="home-headline">The Premium System Education</p>
            <p className="home-subline">Future of Education Technology</p>
            <div class="wrap">
            <div class="search">
            <input type="text" class="searchTerm" placeholder="Search for anything" onKeyUp={getSearchInput}></input>
            <button type="submit" class="searchButton" onClick={getSearchInput}>
            <FontAwesomeIcon icon={faSearch}  />
            </button>
            </div>
            </div>
            { loggedIn 
            ? null 
            :     
            <div className="home-button-new">
                    <Link to="/login" class="btn-in">Log In</Link>
                    <Link to="/signup" class="btn-up">Sign Up</Link>
            </div>
            }
            </div>
            </div>
        </div>
    )
}
export default withRouter(HomeSearchPanel);