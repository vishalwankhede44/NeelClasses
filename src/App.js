import React  from 'react';
import { Switch, Route,BrowserRouter } from 'react-router-dom'
import './App.css';
// import Header from './components/headerComponent';
// import Footer from './components/footerComponent';
// import ViewCourse from './components/viewCoursesComponent';
// import AboutUs from './components/aboutUsComponent';
import Home from './pages/Home/Home';
// import Login from './components/loginComponent';
// import SignUp from './components/signUpComponent';
// import Forgot from './components/forgotComponent';
// import Reset from './components/resetComponent';
// import AdminLogin from './components/adminLoginComponent';
// import ContactUs from './components/contactUsComponent';
// import Create from "./components/create";
// import UploadVideo from './components/UploadVideo';
// import Course from './components/AddCourses';
// import PlayVideo from './components/PlayVideo';
// import UploadNotes from './components/UploadNotes';
// import NotesViewer from '.components/NotesViewer';
import Search from "./pages/Search/Search";
import Course from "./pages/Courses/Course";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
    {/* <Header /> */}
    <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses/search/:searchString" component={Search} />
        <Route path="/courses/:ourseId" component={Course} />
        {/* <Route path="/viewcourses" component={ViewCourse} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset" component={Reset} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/uploadvideo" component={UploadVideo} />
        <Route path="/addcourse" component={Course} />
        <Route path="/uploadnotes" component={UploadNotes} />
        <Route path="/video/:courseId/:videoId" component={PlayVideo} />
        <Route path="/video/:courseId" component={PlayVideo} />
        <Route path="/notes/:courseId/:documentId" component={NotesViewer} />
        <Route path="/notes/:courseId" component={NotesViewer} /> */}
      </Switch>
    {/* <Footer /> */}
</BrowserRouter>
  );
}

export default App;