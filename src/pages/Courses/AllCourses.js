import React from "react"
import axios from 'axios';
import "firebase/firestore";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
import Navbar from "../../components/Navbar";
import AllCoursesContainer from "./AllCourseContainer"
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class AllCourses extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterCourses: [],
            order: "Lowest Ratting",
            currentPage: 1,
            coursePerPage: 3,
            loading : 0,
            courseList:[],
        }
        this.selectHandle = this.selectHandle.bind(this)
        this.selectHandle = this.selectHandle.bind(this)
        this.filterArr = this.filterArr.bind(this)
        this.handleClickPage = this.handleClickPage.bind(this)
        this.renderPageNumbers = this.renderPageNumbers.bind(this)
        this.showComponent = this.showComponent.bind(this)
    }

    componentDidMount() {
        this.getDataFromFirebase();
    }
    getDataFromFirebase = async () => {
            try {
            await axios.get(`https://neelclasses.herokuapp.com/courses`,{
                onDownloadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.setState({
                        loading:percentCompleted
                    });
                }
            })
            .then(res => { 
                console.log(res.data.CourseInfoList)
                this.setState({
                    filterCourses :res.data.CourseInfoList
                });
            })
            } catch (error) {
                console.log(`Get Error ${error}`)
            }
    }      

    handleClickPage(e) {
        this.setState({
            currentPage: Number(e.target.innerText)
        })
    }

    renderPageNumbers() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.filterCourses.length / this.state.coursePerPage); i++) {
            pageNumbers.push(i)
        }

        return pageNumbers.map(number => {
            if(number === this.state.currentPage) {
                return (
                    <div onClick={this.handleClickPage} key={number} className="page-number-active">{number}</div>
                )
            } else {
                return (
                    <div onClick={this.handleClickPage} key={number} className="page-number">{number}</div>
                );
            }
        });
    }


    filterArr() {
 
        let newArr = this.state.filterCourses;
         if (this.state.order === "Lowest Price") {
            newArr = newArr.sort((a,b) => a.coursePrice -  b.coursePrice )
        } else if (this.state.order === "Highest Price") {
            newArr = newArr.sort((a, b) => b.coursePrice - a.coursePrice)
        } else if (this.state.order === "Lowest Ratting") {
            newArr =  newArr.sort((a, b) => a.courseRating - b.courseRating)
        } else if (this.state.order === "Highest Ratting") {
            newArr =  newArr.sort((a, b) => b.courseRating - a.courseRating)
        }
        this.setState({
            filterCourses: newArr
        })
        this.forceUpdate();
    }

    selectHandle(e) {
        this.setState({
            order: e.target.value
        },() => {
            this.filterArr()
        })
    }

    showComponent() {
        let indexOfLastCourse = this.state.currentPage * this.state.coursePerPage;
        let indexOfFirstCourse = indexOfLastCourse - this.state.coursePerPage;
        let currentCourse = this.state.filterCourses.slice(indexOfFirstCourse, indexOfLastCourse)
        return (
           <div className="search-box2" >
                {
                    currentCourse.map((course, i) => (
                         <AllCoursesContainer course={course} key={i} />
                    ))
                }
            </div>
        )
    }

    render() {
        if (this.state.filterCourses.length !== 0 && this.state.loading === 100) {
            return (
                <div>
                     <Navbar/>
                <div className="search-container">
                    <div className="search-header" >
                        <div className="search-header-inner">
                            <div className="search-header-title">{this.state.filterCourses.length} Courses Available </div>
                            <div className="custom-select">
                                <select className="custom-select-select" onChange={this.selectHandle} >
                                    <option value="0">Sort By</option>
                                    <option value="Lowest Price">Lowest Price</option>
                                    <option value="Highest Price">Highest Price</option>
                                    <option value="Lowest Ratting">Lowest Ratting</option>
                                    <option value="Highest Ratting">Highest Ratting</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="search-footer">
                        <div>
                        {this.showComponent()}
                        </div>

                        <div className="page-switch">
                        {this.renderPageNumbers()}
                        </div>
                    </div>
                </div>
                </div>
            )
        } else if ( this.state.filterCourses.length === 0  && this.state.loading ===100) {
            return (
                <div className="search-error">
                    <div className="search-error-text">Sorry, we couldn't find any results for {this.props.match.params.searchString}</div>
                    {/* <FontAwesomeIcon icon={faSearch} className="search-error-icon" /> */}
                </div>
            )
        }
        else {
            return (
                <div>
                    {loadProgressBar()}
                </div>
            )
        }
    }
}


export default AllCourses;