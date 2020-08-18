import React,{useState,useEffect} from 'react';

import HomeSearchPanel from './HomePanel'
import Navbar from "../../components/Navbar";
import AccessNavbar from "../../components/AccessNavbar";
import { useCookies } from "react-cookie";


const Home = () => {
    return(
        <div>
           <Navbar/>
            <HomeSearchPanel />
        </div>
    )
}

export default Home;