// import { useEffect, useState} from 'react';
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';
import { useContext } from "react";
// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import "./SideBar.css"

function SideBar() {
  let {values} = useContext(AppContext)
  let {loggedin} = values
  return (
    <div className='sidebar'>
    Navigation Bar
    {/* height = 95vh width=10vw*/}
    <div className='username'>
    </div>
    {/* will be a map of sections */}
      <div className='section'>
        <div className='section-title' >
          Links
        </div>
        <div className='section-content'>
          <nav>
            <Link to="/">Home</Link> <div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to="/user/posts">{(loggedin)?"My Posts":" "}</Link><div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to="/create/post">{(loggedin)?" New Post":" "}</Link><div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to="/create/user">{(loggedin)?"":"New User?"}</Link><div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to="/user">{(loggedin)?"My Info":""}</Link><div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to="/login">{(loggedin)?"Sign Off":"Log In"}</Link><div/>
          </nav>
          </div>
          <div className='section-content'>
          <nav>
            <Link to=""> </Link><div/>
          </nav>
          </div>
          {/* will have a map of all the content */}
        </div>
      </div>
    
  );
}

export default SideBar;
