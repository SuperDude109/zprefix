// import { useEffect, useState} from 'react';
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';
import { useContext } from "react";
// import config from './config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


function SideBar() {
  let {values} = useContext(AppContext)
  let {loggedin} = values
  return (
    <div className='sidebar' style={{height:"95vh", width:"10vw", background:"Grey", padding:"1vw"}}>
    sidebar
    {/* height = 95vh width=10vw*/}
    <div className='username'>
      username
    </div>
    {/* will be a map of sections */}
    <div className='section'>
      section
      {/* will be a div of section title */}
      <div className='section-title'>
        section-title
      </div>
      <div className='section-content'>
        section-content
        {/* will have a map of all the content */}
      </div>
      <div className='section'style={{background:"hotpink"}}>
        <div className='section-title' >
          Navigate
        </div>
        <div className='section-content'style={{background:"pink", display:"flex",flexDirection:"column",flexWrap:"nowrap" }}>
          <nav>
            <Link to="/">Home</Link> <div/>
            <Link to="/user/posts">{(loggedin)?"My Posts":" "}</Link><div/>
            <Link to="/create/post">{(loggedin)?" New Post":" "}</Link><div/>
            <Link to="/create/user">{(loggedin)?"":"New User?"}</Link><div/>
            <Link to="/user">{(loggedin)?"My Info":""}</Link><div/>
            <Link to="/login">{(loggedin)?"Sign Off":"Log In"}</Link><div/>
            
            <Link to=""> </Link><div/>
          </nav>
          {/* will have a map of all the content */}
        </div>
      </div>
    </div>
  </div>
  );
}

export default SideBar;
